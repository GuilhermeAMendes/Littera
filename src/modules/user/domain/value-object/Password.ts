// Validator
import { PasswordValidator } from "../validator/Password.validator";

// Type
import type { Cryptation } from "../../../../infra/services/cryptation/interfaces/cryptation.interfaces";

export type PasswordProps = {
  hashPassword: string;
};

// Constants
import { QUANTITY_OF_ROUNDS } from "../constants/password.constants";

export class Password {
  private constructor(readonly props: PasswordProps) {}

  public static async create(plainText: string, cryptationService: Cryptation) {
    const { isMinimalLenght, isRequiredCharacters, isSafeContent } =
      PasswordValidator;
    isSafeContent(plainText);
    isRequiredCharacters(plainText);
    isMinimalLenght(plainText);

    const encryption = await cryptationService.hash(
      plainText,
      QUANTITY_OF_ROUNDS
    );

    return new Password({
      hashPassword: encryption,
    });
  }

  public static restore({ hashPassword }: PasswordProps) {
    return new Password({ hashPassword });
  }

  public async compare(
    plainText: string,
    cryptationService: Cryptation
  ): Promise<boolean> {
    return cryptationService.compare(plainText, this.props.hashPassword);
  }

  public get hash() {
    return this.props.hashPassword;
  }
}
