import { RegisterInput, LoginInput } from "../validations/auth.validation";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { findUserByEmail, createUser } from "../repositories/auth.repository";
import { User } from "../../generated/prisma/client";

interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  // Check email
  const existingEmail = await findUserByEmail(data.email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  // Generate JWT
  const token = generateToken(user.id);

  // Remove password before returning
  const { password, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await comparePassword(data.password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  const { password, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};
