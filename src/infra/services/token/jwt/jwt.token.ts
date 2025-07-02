// External library
import {
  sign as jwtSign,
  verify as jwtVerify,
  SignOptions,
  VerifyOptions,
  JwtPayload,
} from "jsonwebtoken";

// Type
import { TokenProvider } from "./interfaces/jwt.interfaces";

export class JWTToken implements TokenProvider {
  sign(
    payload: string | Buffer | object,
    secret: string,
    options?: SignOptions
  ): string {
    return jwtSign(payload, secret, options);
  }
  verify(
    token: string,
    secret: string,
    options?: VerifyOptions
  ): JwtPayload | string {
    return jwtVerify(token, secret, options);
  }
}
