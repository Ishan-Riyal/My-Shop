import express from "express";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    image: req.file.path,
  });
});

export default router;
