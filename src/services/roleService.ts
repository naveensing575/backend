// src/services/roleService.ts
import Role from "../models/Role";

class RoleService {
  async getAllRoles() {
    return await Role.findAll();
  }
}

export default new RoleService();
