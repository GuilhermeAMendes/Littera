// Validator
import {
  isStringEmpty,
  isStringSafe,
} from "../../../../shared/validator/validator.helper";

export class EmailValidator {
  public static isValidFormat(address: string): boolean {
    if (isStringEmpty(address)) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(address);
  }

  public static isSafeContent(address: string): boolean {
    return isStringSafe(address);
  }
}
