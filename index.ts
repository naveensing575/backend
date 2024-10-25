import express from "express";
import sequelize from "./config/database";

const app = express();
const PORT = process.env.PORT || 5000;

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err: any) => {
    console.log("Error: " + err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
