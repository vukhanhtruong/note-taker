import { ErrorCode } from "@core/exceptions/exception.base";
import { Context } from "hono";
import { Result } from "neverthrow";
import { ZodError } from "zod";

export function match<T, E extends Error>(
  result: Result<T, E>,
  print?: Context,
) {
  const success = false;

  return result.match(
    (data) => print.json({ success: true, result: data }, 200), // Success
    (error) => {
      const code = error["code"] ?? null;
      console.log(error);

      if (error instanceof ZodError) {
        return print.json({ success, message: JSON.parse(error.message) }, 400);
      }

      if (code === ErrorCode.INVALID_ENTITY) {
        return print.json({ success, message: error.message }, 400);
      }

      if (code === ErrorCode.CONFLICT) {
        return print.json({ success, message: error.message }, 409);
      }

      if (code === ErrorCode.NOT_FOUND) {
        return print.json({ success, message: error.message }, 404);
      }

      if (code === ErrorCode.UNAUTHORIZED) {
        return print.json({ success, message: error.message }, 401);
      }

      // Default fallback
      return print.json({ success, message: "Internal Server Error" }, 500);
    },
  );
}

export function value<T>(res: Result<T, Error>): T {
  return res.isOk() ? res.value : null;
}

export const parseResult = {
  match,
  value,
};
