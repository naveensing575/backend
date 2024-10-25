// src/routes/uploadRoutes.ts
import { Router } from "express";
import uploadController from "../controllers/uploadController";

const router = Router();

router.post("/", uploadController.createUpload);
router.get("/", uploadController.getUploadsByUser);
router.put("/:id", uploadController.updateUploadStatus);

export default router;
