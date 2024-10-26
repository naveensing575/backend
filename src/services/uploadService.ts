// src/services/uploadService.ts
import Upload from "../models/Upload";
import DataRecord from "../models/DataRecord";

class UploadService {
  async createUpload(data: {
    userId: number;
    filePath: string;
    status: string;
  }) {
    return await Upload.create(data);
  }

  async getUploadsByUser(userId: number) {
    return await Upload.findAll({ where: { userId } });
  }

  async updateUploadStatus(uploadId: number, status: string) {
    const upload = await Upload.findByPk(uploadId);
    if (!upload) throw new Error("Upload not found");

    upload.status = status;
    await upload.save();
    return upload;
  }

  // Save parsed data records to the database
  async saveDataRecords(dataRecords: any[]) {
    return await DataRecord.bulkCreate(dataRecords);
  }
}

export default new UploadService();
