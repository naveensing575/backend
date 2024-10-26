import { Router } from "express";
import metricController from "../controllers/metricController";

const router = Router();

// Route to fetch all metrics
router.get("/", metricController.getAllMetrics);

export default router;
