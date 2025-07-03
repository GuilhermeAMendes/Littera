// External library
import { Request, Response, NextFunction } from "express";

// Constants
import { SECRET_KEY } from "../constants/auth.constants";

// Type
import type { TokenProvider } from "../../../../infra/services/token/jwt/interfaces/jwt.interfaces";

export function authMiddleware(tokenProvider: TokenProvider) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      response.status(401).json({ message: "Token is missing" });
      return;
    }

    const [, token] = authHeader.split(" ");

    try {
      tokenProvider.verify(token, SECRET_KEY);
      next();
    } catch {
      response.status(401).json({ error: "Token invalid" });
      return;
    }
  };
}
