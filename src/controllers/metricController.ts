// src/controllers/metricController.ts
import { Request, Response } from "express";
import metricService from "../services/metricService";

class MetricController {
  async getAllMetrics(req: Request, res: Response) {
    try {
      const metrics = await metricService.getAllMetrics();
      res.json(metrics);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new MetricController();
