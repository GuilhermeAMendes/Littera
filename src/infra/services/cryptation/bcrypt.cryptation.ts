// External library
import { hash, compare } from "bcrypt";

// Type
import type { Cryptation } from "./interfaces/cryptation.interfaces";

export class Bcrypt implements Cryptation {
  hash(password: string, salt: number | string): Promise<string> {
    return hash(password, salt);
  }
  compare(password: string, hashContent: string): Promise<boolean> {
    return compare(password, hashContent);
  }
}
