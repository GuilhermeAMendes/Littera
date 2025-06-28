import { User } from "../../domain/entity/User";

export interface UserGateway {
  create(user: User): Promise<void>;
  findByd(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  rename(id: string, newUsername: string): Promise<void>;
}
