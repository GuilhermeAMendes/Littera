// Service
import { Crypto } from "../../../uuid/crypto.uuid";

export const EXPIRES = "3m";

export const SECRET_TOKEN_KEY = process.env.KEY || new Crypto().generate();
