import { SignUpReq } from "@apps/user/domain/port/usecase";
import { Str } from "chanfana";
import { z } from "zod";

export const SignUpSchema = z.object({
  email: Str({ example: "lorem@gmail.com", required: true }).email(),
  password: Str({ example: "lorem", required: true }),
}) as z.ZodType<SignUpReq>;

export const SignInSchema = SignUpSchema;

export type NoteModel = z.infer<typeof SignUpSchema>;
