// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, roleId } = req.body;
    const user = await authService.registerUser(name, email, password, roleId);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    return res.json({ message: "Login successful", token, user });
  } catch (error) {
    return next(error);
  }
};
