import express from "express";
const router = express.Router();

import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  login,
  logout,
  register,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/").get(protect, admin, getAllUsers);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
