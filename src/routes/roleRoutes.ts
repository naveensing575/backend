// src/routes/roleRoutes.ts
import { Router } from "express";
import roleController from "../controllers/roleController";

const router = Router();

router.get("/", roleController.getAllRoles);

export default router;
