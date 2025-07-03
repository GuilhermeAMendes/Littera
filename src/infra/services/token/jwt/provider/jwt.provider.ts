// Type
interface TokenRequest {
  userId: string;
}

import type { TokenProvider } from "../interfaces/jwt.interfaces";

// Constants
import { EXPIRES, SECRET_TOKEN_KEY } from "../constants/jwt.constants";

export class JWTTokenProvider {
  constructor(private tokenProvider: TokenProvider) {}

  async execute({ userId }: TokenRequest) {
    const token = this.tokenProvider.sign({}, SECRET_TOKEN_KEY, {
      subject: userId,
      expiresIn: EXPIRES,
    });
    return token;
  }
}
