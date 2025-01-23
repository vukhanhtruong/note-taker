import { CreateNoteProps, Note } from "../../entity/note";
import { Result } from "neverthrow";

export interface CreateNewNoteUseCase {
  execute(payload: CreateNoteProps): Promise<Result<Note, Error>>;
}
