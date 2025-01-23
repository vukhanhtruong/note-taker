import { UniqueID } from "@core/unique-id";
import { Note } from "../../entity/note";
import { Result } from "neverthrow";

export type NoteIdReq = {
  id: UniqueID;
};
export interface GetNoteByIdUseCase {
  execute(payload: NoteIdReq): Promise<Result<Note, Error>>;
}
