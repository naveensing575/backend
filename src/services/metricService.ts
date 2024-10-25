// src/services/metricService.ts
import Metric from "../models/Metric";

class MetricService {
  async getAllMetrics() {
    return await Metric.findAll();
  }
}

export default new MetricService();
