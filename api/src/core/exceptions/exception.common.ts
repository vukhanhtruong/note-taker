import { Exception, ErrorCode } from "./exception.base";

/**
 * Used to indicate that entity is not valid
 *
 * @class EntityInvalidException
 * @extends {Exception}
 */
export class EntityInvalidException extends Exception {
  static readonly message = "Invalid Entity";

  constructor(message = "", cause?: Error | any) {
    super(message, cause);
  }

  readonly code = ErrorCode.INVALID_ENTITY;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {Exception}
 */
export class NotFoundException extends Exception {
  static readonly message = "Not Found";

  constructor(message = "", cause?: Error) {
    super(message, cause);
  }

  readonly code = ErrorCode.NOT_FOUND;
}

/**
 * Used to indicate that requires authentication
 *
 * @class UnauthorizedException
 * @extends {Exception}
 */
export class UnauthorizedException extends Exception {
  static readonly message = "Unauthorized";

  constructor(message = "", cause?: Error) {
    super(message, cause);
  }

  readonly code = ErrorCode.UNAUTHORIZED;
}

/**
 * Used to indicate that entity is conflicted or already exist
 *
 * @class ConflictException
 * @extends {Exception}
 */
export class ConflictException extends Exception {
  static readonly message = "Entity be conflicted";

  constructor(message = "", cause?: Error) {
    super(message, cause);
  }

  readonly code = ErrorCode.CONFLICT;
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {Exception}
 */
export class ArgumentInvalidException extends Exception {
  readonly code = ErrorCode.ARGUMENT_INVALID;
}

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {Exception}
 */
export class ArgumentNotProvidedException extends Exception {
  readonly code = ErrorCode.ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {Exception}
 */
export class InternalServerErrorException extends Exception {
  static readonly message = "Internal server error";

  constructor(message = InternalServerErrorException.message, cause?: Error) {
    super(message, cause);
  }

  readonly code = ErrorCode.INTERNAL_SERVER_ERROR;
}
