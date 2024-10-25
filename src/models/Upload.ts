// src/models/Upload.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Upload extends Model {
  public id!: number;
  public userId!: number;
  public filePath!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Upload.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "uploads",
  }
);

export default Upload;
