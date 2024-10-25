// src/services/userService.ts
import User from "../models/User";

class UserService {
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    roleId: number;
  }) {
    return await User.create(data);
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      roleId: number;
    }>
  ) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.update(data);
    return user;
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return user;
  }
}

export default new UserService();
