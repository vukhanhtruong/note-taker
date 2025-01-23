/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class Exception
 * @extends {Error}
 */
export abstract class Exception extends Error {
  abstract code: string;

  constructor(
    readonly message: string,
    readonly cause?: Error,
  ) {
    super(message, { cause });
    Error.captureStackTrace(this, this.constructor);
  }
}

export enum ErrorCode {
  INVALID_ENTITY = "INVALID_ENTITY",
  CONFLICT = "CONFLICT",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  ARGUMENT_INVALID = "ARGUMENT_INVALID",
  ARGUMENT_NOT_PROVIDED = "ARGUMENT_NOT_PROVIDED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}
