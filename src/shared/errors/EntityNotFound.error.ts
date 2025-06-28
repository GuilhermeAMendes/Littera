// Class
import { ApplicationError } from "./application.error";

export class EntityNotFoundError extends ApplicationError {
  constructor(message = "Entity not found") {
    super(message, 404);
    this.name = "EntityNotFoundError";
  }
}
