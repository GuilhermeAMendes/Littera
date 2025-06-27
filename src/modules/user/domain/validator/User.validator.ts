// Validator
import { assertStringIsSafe } from "../../../../shared/validator/validator.helper";

export class UserValidator {
  public static isSafeName(name: string) {
    assertStringIsSafe(name, "User Name Insecure or Invalid.");
  }
}
