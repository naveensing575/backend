// src/services/authService.ts
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "your_jwt_secret";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  roleId: number
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword, roleId });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, roleId: user.roleId }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token, user };
};
