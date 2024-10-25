// server.ts
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import sequelize from "./config/database";
import "./models/User"; // Only include User model
// Comment out other models
// import "./models/Role";
// import "./models/DataRecord";
// import "./models/Upload";
// import "./models/Metric";

const PORT = process.env.PORT ?? 5000;

// Sync only the User model with the database and start the server
sequelize
  .sync({ alter: true }) // Use { force: true } for DB reset on each run (development only)
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });
