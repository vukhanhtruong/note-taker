import { Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { NoteSchema } from "./dto/note.dto";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Context } from "hono";
import {
  GetNoteByIdUseCase,
  GetNotesListUseCase,
} from "@apps/note/domain/port/usecase";
import { parseResult } from "@utils/parse-result";
import { UniqueID } from "@core/unique-id";

@DocsSchema({
  tags: ["Notes"],
  summary: "List Notes",
  request: {
    params: z.object({
      id: Str({ description: "Note ID" }),
    }),
  },
  responses: {
    "200": {
      description: "Returns a note",
      content: {
        "application/json": {
          schema: z.object({
            result: NoteSchema,
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
export class GetNoteByIdHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const { params } = await this.getValidatedData<typeof this.schema>();

    const { id } = params;

    const service = container.resolve<GetNoteByIdUseCase>(
      NoteDIToken.GET_NOTE_BY_ID_USECASE,
    );

    const notes = await service.execute({ id: new UniqueID(id) });

    return parseResult.match(notes, context);
  }
}
