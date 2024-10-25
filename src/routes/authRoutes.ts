// src/routes/authRoutes.ts
import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.register); // Register a new user
router.post("/login", authController.login); // Login an existing user

export default router;
