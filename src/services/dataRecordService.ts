// src/services/dataRecordService.ts
import DataRecord from "../models/DataRecord";
import { Op } from "sequelize";

class DataRecordService {
  async getAllDataRecords(
    filter: { date?: string; location?: string },
    page: number = 1,
    limit: number = 10,
    sortColumn: string = "id", // Default sorting by 'id'
    sortDirection: "asc" | "desc" = "asc"
  ) {
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

    const offset = (page - 1) * limit;

    const { rows: dataRecords, count: totalRecords } =
      await DataRecord.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        order: [[sortColumn, sortDirection]], // Sort by specified column and direction
      });

    const totalPages = Math.ceil(totalRecords / limit);

    return { dataRecords, totalRecords, totalPages, currentPage: page };
  }
}

export default new DataRecordService();
