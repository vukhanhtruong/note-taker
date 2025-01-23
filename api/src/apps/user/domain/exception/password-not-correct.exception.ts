import { UnauthorizedException } from "@core/exceptions/exception.common";

export class PasswordNotCorrectException extends UnauthorizedException {
  static readonly customMessage = "Provided Password Not Correct";

  constructor(error?: Error) {
    super(PasswordNotCorrectException.customMessage, error);
  }
}
