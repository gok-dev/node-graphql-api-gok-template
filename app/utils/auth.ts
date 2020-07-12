import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { AuthenticationError } from "apollo-server-express";

dotenv.config();

async function verifyClientAuth(req: Request) {
  const token = req.headers.authorization;

  if (!token) throw new AuthenticationError("Usuário não autenticado!");

  try {
    return jwt.verify(token, process.env.SECRET || "dev@Secret");
  } catch (err) {
    throw new AuthenticationError("Token Invalido!");
  }
}

export default verifyClientAuth;
