import { Bool, Num, Str } from "chanfana";
import { container } from "tsyringe";
import { z } from "zod";
import { DocsRoute, DocsSchema } from "@utils/openapi";
import { NoteSchema } from "./dto/note.dto";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Context } from "hono";
import { GetNotesListUseCase } from "@apps/note/domain/port/usecase";
import { parseResult } from "@utils/parse-result";

@DocsSchema({
  tags: ["Notes"],
  summary: "List Notes",
  request: {
    query: z.object({
      page: Num({
        description: "Page number",
        default: 0,
      }),
      isArchived: Bool({
        description: "Filter by archived flag",
        required: false,
      }),
    }),
  },
  responses: {
    "200": {
      description: "Returns a list of notes",
      content: {
        "application/json": {
          schema: z.object({
            result: NoteSchema.array(),
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
export class GetNotesHandler extends DocsRoute {
  async handle(context: Context): Promise<Response> {
    const service = container.resolve<GetNotesListUseCase>(
      NoteDIToken.GET_NOTE_LISTS_USECASE,
    );

    const { userId: loggedInUserId } = context.get("user-info");

    // Get validated data
    const { query } = await this.getValidatedData<typeof this.schema>();
    // const { isCompleted = false } = query;

    const notes = await service.execute({
      userId: loggedInUserId,
    });

    return parseResult.match(notes, context);
  }
}
