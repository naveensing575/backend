// src/controllers/roleController.ts
import { Request, Response } from "express";
import roleService from "../services/roleService";

class RoleController {
  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.getAllRoles();
      res.json(roles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new RoleController();
