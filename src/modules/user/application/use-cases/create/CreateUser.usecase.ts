// Entity
import { User } from "../../../domain/entity/User";

// Service
import type { UseCase } from "../../../../../shared/interfaces/usecase.interface";
import type { Cryptation } from "../../../../../infra/services/cryptation/interfaces/cryptation.interfaces";
import type { UUIDGenerator } from "../../../../../infra/services/uuid/interfaces/uuid.interfaces";
import type { UserGateway } from "../../../infra/gateway/user.gateway";

// DTO
import type {
  CreateUserUseCaseInputDTO,
  CreateUserUseCaseOutputDTO,
} from "./createUser.usecase.dto";

// Type
import type { Either } from "../../../../../shared/types/Either.types";

// Function
import {
  isLeft,
  isRight,
  left,
  right,
} from "../../../../../shared/types/Either.types";

// Error
import { ApplicationError } from "../../../../../shared/errors/Application.error";
import { DatabaseError } from "../../../../../shared/errors/DatabaseError.error";
import { EntityNotFoundError } from "../../../../../shared/errors/EntityNotFound.error";

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseInputDTO, CreateUserUseCaseOutputDTO>
{
  constructor(
    private readonly userRepository: UserGateway,
    private readonly uuidService: UUIDGenerator,
    private readonly cryptationService: Cryptation
  ) {}

  public static create(
    userRepository: UserGateway,
    uuidService: UUIDGenerator,
    cryptationService: Cryptation
  ) {
    return new CreateUserUseCase(
      userRepository,
      uuidService,
      cryptationService
    );
  }

  async execute({
    username,
    email,
    password,
  }: CreateUserUseCaseInputDTO): Promise<
    Either<ApplicationError, CreateUserUseCaseOutputDTO>
  > {
    const result = await this.userRepository.findByEmail(email);

    if (isRight(result))
      return left(new DatabaseError("This email is already in use."));

    if (isLeft(result) && !(result.value instanceof EntityNotFoundError))
      return result;

    const user: User = await User.create(
      username,
      email,
      password,
      this.uuidService,
      this.cryptationService
    );

    await this.userRepository.create(user);
    const output: CreateUserUseCaseOutputDTO = {
      id: user.id,
      username,
      email,
      isActive: user.isActive,
    };

    return right(output);
  }
}
