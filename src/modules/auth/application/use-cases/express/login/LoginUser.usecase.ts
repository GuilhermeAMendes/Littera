// Service
import type { UseCase } from "../../../../../../shared/interfaces/usecase.interface";
import type { Cryptation } from "../../../../../../infra/services/cryptation/interfaces/cryptation.interfaces";
import { JWTTokenProvider } from "../../../../../../infra/services/token/jwt/provider/jwt.provider";

// Gateway
import { UserGateway } from "../../../../../user/infra/gateway/user.gateway";

// DTO
import type {
  LoginUserUseCaseInputDTO,
  LoginUserUseCaseOutputDTO,
} from "./loginUser.usecase.dto";

// Type
import type { Either } from "../../../../../../shared/types/Either.types";

// Function
import {
  isLeft,
  left,
  right,
} from "../../../../../../shared/types/Either.types";

// Error
import { ApplicationError } from "../../../../../../shared/errors/Application.error";
import { UnauthorizedError } from "../../../../../../shared/errors/UnauthorizedError.error";

export class LoginUserUseCase
  implements UseCase<LoginUserUseCaseInputDTO, LoginUserUseCaseOutputDTO>
{
  constructor(
    private readonly userRepository: UserGateway,
    private readonly cryptationService: Cryptation,
    private readonly tokenService: JWTTokenProvider
  ) {}

  public static create(
    userRepository: UserGateway,
    cryptationService: Cryptation,
    tokenService: JWTTokenProvider
  ) {
    return new LoginUserUseCase(
      userRepository,
      cryptationService,
      tokenService
    );
  }

  async execute({
    email,
    password,
  }: LoginUserUseCaseInputDTO): Promise<
    Either<ApplicationError, LoginUserUseCaseOutputDTO>
  > {
    const userLookup = await this.userRepository.findByEmail(email);

    if (isLeft(userLookup)) {
      return left(new UnauthorizedError("Invalid credentials"));
    }
    const isPasswordCorrect = await this.cryptationService.compare(
      userLookup.value.passwordHash,
      password
    );

    if (!isPasswordCorrect)
      return left(new UnauthorizedError("Invalid credentials"));

    const token = await this.tokenService.execute({
      userId: userLookup.value.id,
    });

    const output: LoginUserUseCaseOutputDTO = {
      token,
    };

    return right(output);
  }
}
