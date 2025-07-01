// Type
import type { Either } from "../types/Either.types";

// Error
import { ApplicationError } from "../errors/Application.error";

export interface UseCase<InputDTO, OutputDTO> {
  execute(input: InputDTO): Promise<Either<ApplicationError, OutputDTO>>;
}
