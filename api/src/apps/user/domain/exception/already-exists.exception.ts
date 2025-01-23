import { ConflictException } from "@core/exceptions/exception.common";

export class UserAlreadyExistsException extends ConflictException {
  static readonly customMessage = "User Already Exists";

  constructor(error?: Error) {
    super(UserAlreadyExistsException.customMessage, error);
  }
}
