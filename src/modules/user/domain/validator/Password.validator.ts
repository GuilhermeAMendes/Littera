// Validator
import {
  isStringEmpty,
  isStringSafe,
} from "../../../../shared/validator/validator.helper";

// Constants
import { MINIMAL_LENGHT } from "../constants/password.constants";

export class PasswordValidator {
  public static isSafeContent(plaintext: string) {
    if (!isStringSafe(plaintext)) {
      throw new Error("Insecure or empty password.");
    }
  }

  public static isMinimalLenght(plaintext: string) {
    if (isStringEmpty(plaintext) || plaintext.length < MINIMAL_LENGHT) {
      throw new Error(
        `Password must have at least ${MINIMAL_LENGHT} characters.`
      );
    }
  }

  public static isRequiredCharacters(plaintext: string) {
    const hasSpecialChar = /[^A-Za-z0-9]/.test(plaintext);
    const hasUpperCase = /[A-Z]/.test(plaintext);
    const hasNumber = /[0-9]/.test(plaintext);

    if (!hasUpperCase)
      throw new Error("Password should contain at least one capital letter.");
    if (!hasSpecialChar)
      throw new Error("Password must contain at least one special character.");
    if (!hasNumber)
      throw new Error("Password should contain at least one number.");
  }
}
