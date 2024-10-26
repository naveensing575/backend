// src/controllers/uploadController.ts
import { Request, Response } from "express";
import uploadService from "../services/uploadService";
import { Readable } from "stream";
import csvParser from "csv-parser";
import dayjs from "dayjs";

class UploadController {
  public async createUpload(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { file } = req;

      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const filePath = file.originalname;
      let upload = await uploadService.createUpload({
        userId,
        filePath,
        status: "pending",
      });

      const dataRecords: any[] = []; // Store parsed data records

      // Stream and parse the CSV data
      const stream = Readable.from(file.buffer.toString());
      stream
        .pipe(csvParser())
        .on("data", (data) => {
          // Validate and parse required fields
          const parsedTimestamp = dayjs(
            data.timestamp,
            ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD HH:mm:ss"],
            true
          );

          // Check for validity of each required field
          if (
            !parsedTimestamp.isValid() ||
            !data.location ||
            isNaN(parseFloat(data.amount))
          ) {
            console.warn("Skipping incomplete or invalid record:", data);
            return; // Skip this record if any field is invalid
          }

          dataRecords.push({
            timestamp: parsedTimestamp.toISOString(),
            location: data.location,
            amount: parseFloat(data.amount),
          });
        })
        .on("end", async () => {
          // Only attempt to save records if there are valid entries
          if (dataRecords.length === 0) {
            res
              .status(400)
              .json({ error: "No valid records found in the CSV file" });
            return;
          }

          // Save parsed data records to the database
          await uploadService.saveDataRecords(dataRecords);
          upload = await uploadService.updateUploadStatus(
            upload.id,
            "completed"
          );

          res.status(201).json({ upload });
        })
        .on("error", (error) => {
          console.error("CSV Parsing Error:", error);
          res.status(500).json({ error: "Failed to parse CSV file" });
        });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getUploadsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const uploads = await uploadService.getUploadsByUser(userId);
      res.status(200).json(uploads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateUploadStatus(req: Request, res: Response): Promise<void> {
    try {
      const uploadId = parseInt(req.params.id, 10);
      const { status } = req.body;

      const updatedUpload = await uploadService.updateUploadStatus(
        uploadId,
        status
      );
      res.status(200).json(updatedUpload);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UploadController();
