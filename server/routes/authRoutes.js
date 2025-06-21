import express from "express";
import {
  registUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
