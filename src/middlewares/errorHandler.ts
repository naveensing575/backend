// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

// Define an interface for typed error handling
interface CustomError extends Error {
  status?: number;
}

// Error handling middleware
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status ?? 500; // Default to 500 if status is not set
  const message = err.message ?? "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
};
