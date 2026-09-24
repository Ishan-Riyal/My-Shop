import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items found");
  }

  const itemsFromDB = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item._id);
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item._id}`);
      }
      return {
        ...item,
        name: product.name,
        image: product.image,
        price: product.price,
        product: item._id,
      };
    }),
  );

  const itemsPrice = itemsFromDB.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = new Order({
    orderItems: itemsFromDB,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  // ✅ Skip Razorpay for COD
  if (paymentMethod === "COD") {
    return res.status(201).json(createdOrder);
  }

  const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const rzpOrder = await rzp.orders.create({
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      receipt: `receipt_${createdOrder._id}`,
    });

    createdOrder.razorpayOrderId = rzpOrder.id;
    await createdOrder.save();

    res.status(201).json({
      ...createdOrder._doc,
      razorpayOrderId: rzpOrder.id,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Payment gateway initialization failed");
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // 1. Find the order
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // 2. Prevent double processing
  if (order.isPaid) {
    res.status(400);
    throw new Error("Order is already paid");
  }

  // 3. Signature Verification
  const data = `${razorpay_order_id}|${razorpay_payment_id}`;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(data)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error("Invalid payment signature");
  }

  // 4. Update the order
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: razorpay_payment_id,
    status: "success",
    update_time: Date.now().toString(),
    email_address: req.user.email,
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export const getUserOrders = asyncHandler(async (req, res) => {
  console.log("MY Orders");
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 5;

  const query = { user: req.user._id };
  if (req.query.keyword) {
    query._id = req.query.keyword;
  }

  const count = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 10;

  const filter = req.query.keyword ? { _id: req.query.keyword } : {};

  const count = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .populate("user", "id name")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});
