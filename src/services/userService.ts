// src/services/userService.ts
import User from "../models/User";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  roleId: number;
}) => {
  return await User.create(userData);
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const updateUser = async (
  id: number,
  updateData: Partial<{ name: string; email: string; password: string }>
) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  return await user.update(updateData);
};

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  return await user.destroy();
};
