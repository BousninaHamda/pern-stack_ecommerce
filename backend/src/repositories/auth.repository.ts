import { prisma } from "../config/database";
import { User } from "../../generated/prisma/client";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

interface CreateUserData {
  username?: string;
  email: string;
  password: string;
}

export const createUser = async (data: CreateUserData): Promise<User> => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      username: data.username,
    },
  });
};
