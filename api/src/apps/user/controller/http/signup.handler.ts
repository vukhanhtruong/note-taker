import { Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { Context } from "hono";
import { SignUpUseCase } from "@apps/user/domain/port/usecase";
import { UserDIToken } from "@apps/user/domain/user.token";
import { SignUpSchema } from "./dto/user.dto";
import { parseResult } from "@utils/parse-result";

@DocsSchema({
  tags: ["Users"],
  summary: "SignUp",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SignUpSchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Returns User information ",
      content: {
        "application/json": {
          schema: z.object({
            result: SignUpSchema,
          }),
        },
      },
    },
    "400": {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.array(
              z.object({
                validation: z.enum(["email", "password", "username"]),
                code: z.string(),
                message: z.string(),
                path: z.array(z.string()),
              }),
            ),
          }),
        },
      },
    },
    "409": {
      description: "User already exists",
      content: {
        "application/json": {
          schema: z.object({
            message: Str({ example: "User already exists" }),
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
export class UserSignUpHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const { body } = await this.getValidatedData<typeof this.schema>();

    const service = container.resolve<SignUpUseCase>(
      UserDIToken.SIGN_UP_USECASE,
    );
    const user = await service.execute(body);

    return parseResult.match(user, context);
  }
}
