// src/routes/dataRecordRoutes.ts
import { Router } from "express";
import dataRecordController from "../controllers/dataRecordController";

const router = Router();

router.get("/", dataRecordController.getAllDataRecords);

export default router;
