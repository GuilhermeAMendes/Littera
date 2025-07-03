// Service
import { Crypto } from "../../../../infra/services/uuid/crypto.uuid";

export const SECRET_KEY = process.env.KEY || new Crypto().generate();
