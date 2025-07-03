// Repository
import { UserRepositoryPrisma } from "../../../user/infra/repository/prisma/User.repository";

// Factory
import {
  bcrypt,
  tokenProvider,
  prisma,
} from "../../../../shared/factory/factory.shared";

// Login
import { LoginUserUseCase } from "../../application/use-cases/express/login/LoginUser.usecase";
import { LoginUserController } from "../controllers/express/login/LoginUser.controller";

export function createAuthControllers() {
  const userRepository = UserRepositoryPrisma.with(prisma);

  const login = LoginUserController.create(
    LoginUserUseCase.create(userRepository, bcrypt, tokenProvider)
  );

  return [login];
}
