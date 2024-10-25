// src/index.ts
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env

import app from "./app";
import sequelize from "./config/database";
import "./models/User";
import "./models/Role";
import "./models/DataRecord";
import "./models/Upload";
import "./models/Metric";

const PORT = process.env.PORT || 5000;

// Sync models to the database and start the server
sequelize
  .sync({ alter: true }) // Use { force: true } in development if you want to reset the DB on each run
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });
