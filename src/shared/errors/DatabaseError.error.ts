// Class
import { ApplicationError } from "./Application.error";

export class DatabaseError extends ApplicationError {
  constructor(message = "Database error") {
    super(message, 500);
    this.name = "DatabaseError";
  }
}
