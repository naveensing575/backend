// src/controllers/userController.ts
import { Request, Response } from "express";
import userService from "../services/userService";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(
        parseInt(req.params.id),
        req.body
      );
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
