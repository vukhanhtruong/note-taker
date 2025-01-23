import { Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { Context } from "hono";
import { NoteSchema } from "./dto/note.dto";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { DeleteNoteUseCase } from "@apps/note/domain/port/usecase";
import { UniqueID } from "@core/unique-id";
import { parseResult } from "@utils/parse-result";

@DocsSchema({
  tags: ["Notes"],
  summary: "Delete a Note",
  request: {
    params: z.object({
      id: Str({ description: "Note ID" }),
    }),
  },
  responses: {
    "200": {
      description: "Returns a deleted note",
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
    "404": {
      description: "Note Not Found",
      content: {
        "application/json": {
          schema: z.object({
            message: Str({ example: "Note Not Found" }),
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
export class DeleteNoteHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const { params } = await this.getValidatedData<typeof this.schema>();

    const { id: noteId } = params;

    const { userId: loggedInUserId } = context.get("user-info");

    const noteService = container.resolve<DeleteNoteUseCase>(
      NoteDIToken.DELETE_NOTE_USECASE,
    );

    const note = await noteService.execute({
      noteId: new UniqueID(noteId),
      userId: loggedInUserId,
    });

    return parseResult.match(note, context);
  }
}
