// Service
import type { UseCase } from "../../../../../../shared/interfaces/usecase.interface";
import type { UserGateway } from "../../../../infra/gateway/user.gateway";

// DTO
import type {
  ProfileUserUseCaseInputDTO,
  ProfileUserUseCaseOutputDTO,
} from "./profileUser.usecase.dto";

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

export class ProfileUserUseCase
  implements UseCase<ProfileUserUseCaseInputDTO, ProfileUserUseCaseOutputDTO>
{
  constructor(private readonly userRepository: UserGateway) {}

  public static create(userRepository: UserGateway) {
    return new ProfileUserUseCase(userRepository);
  }

  async execute({
    userId,
  }: ProfileUserUseCaseInputDTO): Promise<
    Either<ApplicationError, ProfileUserUseCaseOutputDTO>
  > {
    const userLookup = await this.userRepository.findById(userId);

    if (isLeft(userLookup)) {
      return left(userLookup.value);
    }

    const output: ProfileUserUseCaseOutputDTO = {
      id: userLookup.value.id,
      username: userLookup.value.username,
      email: userLookup.value.email,
      isActive: userLookup.value.isActive,
    };

    return right(output);
  }
}
