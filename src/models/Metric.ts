// src/models/Metric.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Metric extends Model {
  public id!: number;
  public name!: string;
  public value!: number;
}

Metric.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: "metrics",
  }
);

export default Metric;
