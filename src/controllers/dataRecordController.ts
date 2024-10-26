// src/controllers/dataRecordController.ts
import { Request, Response } from "express";
import dataRecordService from "../services/dataRecordService";

class DataRecordController {
  async getAllDataRecords(req: Request, res: Response) {
    try {
      const filter = {
        date: req.query.date as string | undefined,
        location: req.query.location as string | undefined,
      };
      const records = await dataRecordService.getAllDataRecords(filter);
      res.json(records);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new DataRecordController();
