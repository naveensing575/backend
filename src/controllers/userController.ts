// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};

// Get a user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) {
      const error: Error & { status?: number } = new Error("User not found");
      error.status = 404;
      return next(error);
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await userService.updateUser(
      Number(req.params.id),
      req.body
    );
    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
