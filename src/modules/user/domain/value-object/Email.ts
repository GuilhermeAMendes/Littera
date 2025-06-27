// Validator
import { EmailValidator } from "../validator/Email.validator";

// Type
export type EmailProps = {
  address: string;
};

export class Email {
  private constructor(readonly props: EmailProps) {}

  public static create({ address }: EmailProps) {
    EmailValidator.isSafeContent(address);
    EmailValidator.isValidFormat(address);

    return new Email({ address });
  }

  public static restore({ address }: EmailProps) {
    return new Email({ address });
  }

  public get address() {
    return this.props.address;
  }

  public equals(email: Email): boolean {
    return this.address === email.address;
  }
}
