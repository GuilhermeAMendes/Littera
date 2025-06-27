// Type
import type { UUIDGenerator } from "./interfaces/uuid.interfaces";

export class Crypto implements UUIDGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
