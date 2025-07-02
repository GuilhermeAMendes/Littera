// Service
import { PrismaORM } from "../../infra/services/orm/prisma/orm.prisma";

import { Bcrypt } from "../../infra/services/cryptation/bcrypt.cryptation";

import { JWTToken } from "../../infra/services/token/jwt/jwt.token";
import { JWTTokenProvider } from "../../infra/services/token/jwt/provider/jwt.provider";

import { Crypto } from "../../infra/services/uuid/crypto.uuid";

export const prisma = PrismaORM.getInstance();

export const bcrypt = new Bcrypt();

export const UuidGenerator = new Crypto();

export const jwtToken = new JWTToken();

export const tokenProvider = new JWTTokenProvider(jwtToken);
