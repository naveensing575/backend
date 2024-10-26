// src/models/DataRecord.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class DataRecord extends Model {
  public id!: number;
  public timestamp!: Date;
  public location!: string;
  public amount!: number;
}

DataRecord.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    timestamp: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: "data_records",
  }
);

export default DataRecord;
