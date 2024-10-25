// src/app.ts
import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import dataRecordRoutes from "./routes/dataRecordRoutes";
import metricRoutes from "./routes/metricRoutes";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authenticateToken, userRoutes);
app.use("/roles", roleRoutes); // Roles accessible without auth
app.use("/data-records", dataRecordRoutes);
app.use("/metrics", metricRoutes);

export default app;
