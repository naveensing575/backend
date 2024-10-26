// src/services/dataRecordService.ts
import DataRecord from "../models/DataRecord";
import { Op } from "sequelize";

class DataRecordService {
  async getAllDataRecords(filter: { date?: string; location?: string }) {
    const whereClause: any = {};

    // Apply date filtering if provided
    if (filter.date) {
      whereClause.timestamp = {
        [Op.gte]: new Date(filter.date + "T00:00:00Z"),
        [Op.lte]: new Date(filter.date + "T23:59:59Z"),
      };
    }

    // Apply location filtering if provided
    if (filter.location) {
      whereClause.location = filter.location;
    }

    return await DataRecord.findAll({ where: whereClause });
  }
}

export default new DataRecordService();
