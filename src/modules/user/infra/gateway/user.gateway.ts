// Entity
import { User } from "../../domain/entity/User";

// Error
import { DatabaseError } from "../../../../shared/errors/DatabaseError.error";
import { EntityNotFoundError } from "../../../../shared/errors/EntityNotFound.error";

// Type
import { Either } from "../../../../shared/types/Either.types";

export interface UserGateway {
  create(user: User): Promise<Either<DatabaseError, void>>;
  findByd(
    id: string
  ): Promise<Either<DatabaseError | EntityNotFoundError, User | null>>;
  findByEmail(
    email: string
  ): Promise<Either<DatabaseError | EntityNotFoundError, User | null>>;
  rename(
    id: string,
    newUsername: string
  ): Promise<Either<DatabaseError | EntityNotFoundError, void>>;
}
