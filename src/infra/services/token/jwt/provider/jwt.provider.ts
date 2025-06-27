// Type
interface TokenRequest {
  userId: string;
}

import type { TokenProvider } from "../interfaces/jwt.interfaces";

// Constants
import { EXPIRES } from "../constants/jwt.constants";

export class JWTTokenProvider {
  constructor(private tokenProvider: TokenProvider) {}

  async execute({ userId }: TokenRequest) {
    const token = this.tokenProvider.sign({}, "", {
      subject: userId,
      expiresIn: EXPIRES,
    });
    return token;
  }
}
