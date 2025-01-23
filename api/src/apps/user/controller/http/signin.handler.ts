import { Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { Context } from "hono";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { SignInUseCase } from "@apps/user/domain/port/usecase";
import { UserDIToken } from "@apps/user/domain/user.token";
import { SignInSchema } from "./dto/user.dto";
import { parseResult } from "@utils/parse-result";

@DocsSchema({
  tags: ["Users"],
  summary: "SignIn",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SignInSchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Sign-in successfully",
      content: {
        "application/json": {
          schema: z.object({
            result: z.object({
              user: SignInSchema,
            }),
          }),
        },
      },
    },
    "404": {
      description: "User Not Found",
      content: {
        "application/json": {
          schema: z.object({
            message: Str({ example: "User Not Found" }),
          }),
        },
      },
    },
    "401": {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: z.object({
            message: Str({ example: "Unauthorized" }),
          }),
        },
      },
    },
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({
            message: Str({ example: "Internal Server Error" }),
          }),
        },
      },
    },
  },
})
export class UserSignInHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const { body } = await this.getValidatedData<typeof this.schema>();

    const service = container.resolve<SignInUseCase>(
      UserDIToken.SIGN_IN_USECASE,
    );
    const { JWT_SECRET } = context.env;
    const signedInUser = await service.execute(body, JWT_SECRET);

    return parseResult.match(signedInUser, context);
  }
}
