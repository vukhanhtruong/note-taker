import { Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { CreateNoteSchema, NoteSchema } from "./dto/note.dto";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Context } from "hono";
import { CreateNewNoteUseCase } from "@apps/note/domain/port/usecase";
import { parseResult } from "@utils/parse-result";

@DocsSchema({
  tags: ["Notes"],
  summary: "Create a Note",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateNoteSchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Create a note",
      content: {
        "application/json": {
          schema: z.object({
            result: z.object({
              note: NoteSchema,
            }),
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
                validation: z.enum(["title"]),
                code: z.string(),
                message: z.string(),
                path: z.array(z.string()),
              }),
            ),
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
export class CreateNoteHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const { body } = await this.getValidatedData<typeof this.schema>();

    const { userId: loggedInUserId } = context.get("user-info");

    const noteService = container.resolve<CreateNewNoteUseCase>(
      NoteDIToken.CREATE_NOTE_USECASE,
    );
    const note = await noteService.execute({
      ...body,
      createdBy: loggedInUserId,
    });

    return parseResult.match(note, context);
  }
}
