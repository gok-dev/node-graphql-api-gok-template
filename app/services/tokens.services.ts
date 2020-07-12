import * as jwt from "jsonwebtoken";
import { userTypes } from "../ts/types";

// Created primary factor authentication
export function createExternToken(
  apiAccess: string,
  apiKey: string,
  secret: string
): Array<string> {
  const token = jwt.sign(
    { externClient: { access: apiAccess, key: apiKey } },
    secret,
    {
      expiresIn: "30d",
    }
  );

  return [token];
}

// Created token JWT
export function createTokens(user: userTypes, secret: string): Array<string> {
  const token = jwt.sign({ user: { id: user.id, role: user.role } }, secret, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(
    { user: { id: user.id, role: user.role } },
    secret,
    { expiresIn: "30d" }
  );

  return [token, refreshToken];
}

// Created refresh token
export async function refreshTokens(refreshToken: string, secret: string) {
  let userId = 0;
  let userType = "";

  try {
    const {
      user: { id, role },
    }: any = jwt.decode(refreshToken);

    userId = id;
    userType = role;

    jwt.verify(refreshToken, secret);
  } catch (err) {
    return {};
  }
}
