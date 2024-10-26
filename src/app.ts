// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import dataRecordRoutes from "./routes/dataRecordRoutes";
import metricRoutes from "./routes/metricRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authenticateToken, userRoutes);
app.use("/roles", authenticateToken, roleRoutes);
app.use("/data-records", authenticateToken, dataRecordRoutes);
app.use("/metrics", authenticateToken, metricRoutes);
app.use("/uploads", authenticateToken, uploadRoutes);

export default app;
