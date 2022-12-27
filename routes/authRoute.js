import express from "express";
import { login, register } from "../controllers/authController.js";
const router = express.Router();

// REGISTER CONTROLLER
router.post("/register", register);
router.post("/login", login);

export default router;