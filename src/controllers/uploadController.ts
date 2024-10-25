// src/controllers/uploadController.ts
import { Request, Response } from "express";
import uploadService from "../services/uploadService";

class UploadController {
  async createUpload(req: Request, res: Response) {
    try {
      const { filePath } = req.body;
      const userId = (req as any).user.userId;

      const upload = await uploadService.createUpload({
        userId,
        filePath,
        status: "pending",
      });
      res.status(201).json(upload);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUploadsByUser(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId; // Assuming JWT middleware adds `user` to req
      const uploads = await uploadService.getUploadsByUser(userId);
      res.json(uploads);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUploadStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const uploadId = parseInt(req.params.id);

      const upload = await uploadService.updateUploadStatus(uploadId, status);
      res.json(upload);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UploadController();
