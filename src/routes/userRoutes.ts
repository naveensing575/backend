// src/routes/userRoutes.ts
import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/", userController.createUser); // Create a new user
router.get("/", userController.getAllUsers); // Retrieve all users
router.get("/:id", userController.getUserById); // Retrieve a user by ID
router.put("/:id", userController.updateUser); // Update a user by ID
router.delete("/:id", userController.deleteUser); // Delete a user by ID

export default router;
