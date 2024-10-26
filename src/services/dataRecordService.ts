// src/services/dataRecordService.ts
import DataRecord from "../models/DataRecord";

class DataRecordService {
  async getAllDataRecords(filter: any) {
    return await DataRecord.findAll({ where: filter });
  }
}

export default new DataRecordService();
