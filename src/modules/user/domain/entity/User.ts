// Value-Object
import { Email } from "../value-object/Email";
import { Password } from "../value-object/Password";

// Validator
import { UserValidator } from "../validator/User.validator";

// Type
import type { UUIDGenerator } from "../../../../infra/services/uuid/interfaces/uuid.interfaces";
import type { Cryptation } from "../../../../infra/services/cryptation/interfaces/cryptation.interfaces";

export type UserProps = {
  id: string;
  username: string;
  email: Email;
  password: Password;
  isActive: boolean;
};

export class User {
  private constructor(readonly props: UserProps) {}

  public static async create(
    username: string,
    emailAddress: string,
    rawPassword: string,
    UUUIDProvider: UUIDGenerator,
    cryptationService: Cryptation
  ) {
    UserValidator.isSafeName(username);

    const userEmail: Email = Email.create({ address: emailAddress });
    const userPassword: Password = await Password.create(
      rawPassword,
      cryptationService
    );

    return new User({
      id: UUUIDProvider.generate(),
      username,
      email: userEmail,
      password: userPassword,
      isActive: true,
    });
  }

  public static restore(props: UserProps) {
    return new User({ ...props });
  }

  private onChange(updated: Partial<UserProps>) {
    return new User({
      ...this.props,
      ...updated,
    });
  }

  public changeUsername(newUsername: string) {
    return this.onChange({ username: newUsername });
  }

  public deactivate() {
    return this.onChange({ isActive: false });
  }

  public activate() {
    return this.onChange({ isActive: true });
  }

  public get id() {
    return this.props.id;
  }

  public get username() {
    return this.props.username;
  }

  public get email() {
    return this.props.email.address;
  }

  public get isActive() {
    return this.props.isActive;
  }

  public get passwordHash() {
    return this.props.password.hash;
  }
}
