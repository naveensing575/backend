// src/routes/uploadRoutes.ts
import { Router } from "express";
import multer from "multer";
import uploadController from "../controllers/uploadController";

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

// Define routes for upload
router.post("/", upload.single("file"), uploadController.createUpload);
router.get("/", uploadController.getUploadsByUser);
router.put("/:id", uploadController.updateUploadStatus);

export default router;
