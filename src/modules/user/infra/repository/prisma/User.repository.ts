// Service
import { PrismaClient } from "../../../../../../generated/prisma";

// Entity
import { User } from "../../../domain/entity/User";

// Value-object
import { Email } from "../../../domain/value-object/Email";
import { Password } from "../../../domain/value-object/Password";

// Error
import { DatabaseError } from "../../../../../shared/errors/DatabaseError.error";
import { EntityNotFoundError } from "../../../../../shared/errors/EntityNotFound.error";

// Functions
import {
  left,
  right,
  isLeft,
  isRight,
} from "../../../../../shared/types/Either.types";

// Type
import type { UserGateway } from "../../gateway/user.gateway";
import type { Either } from "../../../../../shared/types/Either.types";
import { ApplicationError } from "../../../../../shared/errors/Application.error";

export class UserRepositoryPrisma implements UserGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static with(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient);
  }

  async create(user: User): Promise<Either<ApplicationError, void>> {
    const poetData = {
      id: user.id,
      username: user.username,
      email: user.email,
      user_password: user.passwordHash,
      is_active: user.isActive,
    };
    try {
      await this.prismaClient.poet.create({ data: poetData });
      return right(undefined);
    } catch (error) {
      console.error("Failed to create user:", error);
      return left(new DatabaseError("Database error while creating user."));
    }
  }

  async findById(id: string): Promise<Either<ApplicationError, User>> {
    try {
      const dbPoet = await this.prismaClient.poet.findFirst({
        where: { id, is_active: true },
      });

      if (!dbPoet) return left(new EntityNotFoundError("User not found."));

      const poet = User.restore({
        id: dbPoet.id,
        username: dbPoet.username,
        email: Email.restore({ address: dbPoet.email }),
        password: Password.restore({ hashPassword: dbPoet.user_password }),
        isActive: dbPoet.is_active || false,
      });

      return right(poet);
    } catch (error) {
      console.error("Failed to find user by ID:", error);
      return left(new DatabaseError("Database error while retrieving user."));
    }
  }

  async findByEmail(email: string): Promise<Either<ApplicationError, User>> {
    try {
      const dbPoet = await this.prismaClient.poet.findFirst({
        where: { email, is_active: true },
      });

      if (!dbPoet) return left(new EntityNotFoundError("User not found."));

      const poet = User.restore({
        id: dbPoet.id,
        username: dbPoet.username,
        email: Email.restore({ address: dbPoet.email }),
        password: Password.restore({ hashPassword: dbPoet.user_password }),
        isActive: dbPoet.is_active || false,
      });

      return right(poet);
    } catch (error) {
      console.error("Failed to find user by email:", error);
      return left(new DatabaseError("Database error while retrieving user."));
    }
  }

  async rename(
    id: string,
    newUsername: string
  ): Promise<Either<ApplicationError, void>> {
    try {
      const userResult = await this.findById(id);

      if (isLeft(userResult)) return left(userResult.value);

      if (!userResult.value)
        return left(new EntityNotFoundError("User not found."));

      await this.prismaClient.poet.update({
        where: { id },
        data: { username: newUsername },
      });

      return right(undefined);
    } catch (error) {
      console.error("Failed to update user:", error);
      return left(new DatabaseError("Database error while updating user."));
    }
  }
}
