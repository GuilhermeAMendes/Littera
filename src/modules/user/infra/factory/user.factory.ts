// Repository
import { UserRepositoryPrisma } from "../repository/prisma/User.repository";

// Factory
import {
  bcrypt,
  prisma,
  UuidGenerator,
  jwtToken,
} from "../../../../shared/factory/factory.shared";

// Create
import { CreateUserUseCase } from "../../application/use-cases/express/create/CreateUser.usecase";
import { CreateUserController } from "../controllers/express/create/CreateUser.controller";
import { ProfileUserController } from "../controllers/express/profile/ProfileUser.controller";
import { ProfileUserUseCase } from "../../application/use-cases/express/profile/ProfileUser.usecase";

export function createUserControllers() {
  const userRepository = UserRepositoryPrisma.with(prisma);

  const create = CreateUserController.create(
    CreateUserUseCase.create(userRepository, UuidGenerator, bcrypt)
  );

  const profile = ProfileUserController.create(
    ProfileUserUseCase.create(userRepository),
    jwtToken
  );

  return [create, profile];
}
