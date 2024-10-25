// src/routes/metricRoutes.ts
import { Router } from "express";
import metricController from "../controllers/metricController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, metricController.getAllMetrics);

export default router;
