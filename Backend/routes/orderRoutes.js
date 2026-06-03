import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/create").post(protect, createOrder);

router.route("/myorders").get(protect, getUserOrders);

router.route("/").get(protect, admin, getAllOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
