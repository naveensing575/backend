// src/services/authService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET ?? "default_secret";

class AuthService {
  async register(data: {
    name: string;
    email: string;
    password: string;
    roleId: number;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await User.create({ ...data, password: hashedPassword });
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { user, token };
  }
}

export default new AuthService();
