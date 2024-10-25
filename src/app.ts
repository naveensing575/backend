// src/app.ts
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
// import uploadRoutes from "./routes/uploadRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

// Middleware setup
app.use(cors()); // Enables CORS
app.use(morgan("dev")); // Logs HTTP requests to the console
app.use(express.json()); // Parses incoming JSON requests

// Route handling
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/auth", authRoutes); // Authentication routes
// app.use("/api/uploads", uploadRoutes); // File upload routes

// Error handling middleware
app.use(errorHandler);

export default app;
