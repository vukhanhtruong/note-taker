import { UniqueID } from "@core/unique-id";
import { Note } from "../../entity/note";
import { Result } from "neverthrow";

export type QueryNotesReq = {
  userId: UniqueID;
};
export interface GetNotesListUseCase {
  execute(payload: QueryNotesReq): Promise<Result<Note[], Error>>;
}
