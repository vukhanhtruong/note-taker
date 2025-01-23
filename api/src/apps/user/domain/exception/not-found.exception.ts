import { NotFoundException } from "@core/exceptions/exception.common";

export class UserNotFoundException extends NotFoundException {
  static readonly customMessage = "User Not Found";

  constructor(error?: Error) {
    super(UserNotFoundException.customMessage, error);
  }
}
