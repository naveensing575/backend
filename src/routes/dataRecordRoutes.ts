// src/routes/dataRecordRoutes.ts
import { Router } from "express";
import dataRecordController from "../controllers/dataRecordController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, dataRecordController.getAllDataRecords);

export default router;
