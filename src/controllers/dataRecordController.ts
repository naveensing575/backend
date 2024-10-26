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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortColumn = (req.query.sortColumn as string) || "id";
      const sortDirection =
        (req.query.sortDirection as "asc" | "desc") || "asc";

      const response = await dataRecordService.getAllDataRecords(
        filter,
        page,
        limit,
        sortColumn,
        sortDirection
      );
      res.json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new DataRecordController();
