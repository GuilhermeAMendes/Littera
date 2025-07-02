// Repository
import { UserRepositoryPrisma } from "../repository/prisma/User.repository";

// Factory
import {
  bcrypt,
  prisma,
  UuidGenerator,
} from "../../../../shared/factory/factory.shared";

// Create
import { CreateUserUseCase } from "../../application/use-cases/express/create/CreateUser.usecase";
import { CreateUserController } from "../controllers/express/create/CreateUser.controller";

export function createUserControllers() {
  const userRepository = UserRepositoryPrisma.with(prisma);

  const create = CreateUserController.create(
    CreateUserUseCase.create(userRepository, UuidGenerator, bcrypt)
  );

  return [create];
}
