import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";
import {
  useCreateOrderMutation,
  useGetRazorpayKeyQuery,
  usePayOrderMutation,
} from "../slices/ordersSlice";

export const usePlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [payOrder, { isLoading: isUpdating }] = usePayOrderMutation();
  const { data: razorpayKey } = useGetRazorpayKeyQuery();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress?.address, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const placeOrderHandler = async () => {
    try {
      // ✅ COD flow
      if (cart.paymentMethod === "COD") {
        const orderData = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();

        dispatch(clearCartItems());
        toast.success("Order Placed Successfully!");
        navigate(`/orders/${orderData._id}`);
        return;
      }

      // ✅ Razorpay flow
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) return toast.error("Payment system failed to load.");

      const orderData = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      const options = {
        key: razorpayKey?.keyId,
        amount: Math.round(orderData.totalPrice * 100),
        currency: "INR",
        name: "myShop",
        description: "Order Payment",
        order_id: orderData.razorpayOrderId,
        handler: async (response) => {
          try {
            await payOrder({
              orderId: orderData._id,
              details: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            }).unwrap();

            dispatch(clearCartItems());
            toast.success("Payment Successful!");
            navigate(`/orders/${orderData._id}`);
          } catch (err) {
            toast.error(err?.data?.message || "Order status update failed");
          }
        },
        prefill: { name: userInfo.name, email: userInfo.email },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return {
    cart,
    isLoading: isCreating || isUpdating,
    placeOrderHandler,
  };
};
