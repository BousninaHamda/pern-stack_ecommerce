import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const secret: Secret = process.env.JWT_SECRET!;

  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign({ userId }, secret, options);
};
