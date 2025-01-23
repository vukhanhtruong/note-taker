import { Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { NoteSchema, UpdateNoteSchema } from "./dto/note.dto";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Context } from "hono";
import { parseResult } from "@utils/parse-result";
import { UpdateNoteUseCase } from "@apps/note/domain/port/usecase/update-note.usecase";
import { UniqueID } from "@core/unique-id";

@DocsSchema({
  tags: ["Notes"],
  summary: "Update a Note",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateNoteSchema,
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
export class UpdateNoteHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const { body } = await this.getValidatedData<typeof this.schema>();

    const { userId: loggedInUserId } = context.get("user-info");

    const noteService = container.resolve<UpdateNoteUseCase>(
      NoteDIToken.UPDATE_NOTE_USECASE,
    );
    const note = await noteService.execute({
      ...body,
      id: new UniqueID(body.id),
      createdBy: loggedInUserId,
    });

    return parseResult.match(note, context);
  }
}
