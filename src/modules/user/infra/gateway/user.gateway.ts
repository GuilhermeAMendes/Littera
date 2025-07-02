// Entity
import { User } from "../../domain/entity/User";

// Error
import { ApplicationError } from "../../../../shared/errors/Application.error";

// Type
import { Either } from "../../../../shared/types/Either.types";

export interface UserGateway {
  create(user: User): Promise<Either<ApplicationError, void>>;
  findById(id: string): Promise<Either<ApplicationError, User>>;
  findByEmail(email: string): Promise<Either<ApplicationError, User>>;
  rename(
    id: string,
    newUsername: string
  ): Promise<Either<ApplicationError, void>>;
}
