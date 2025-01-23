import { inject } from "tsyringe";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Note } from "@apps/note/domain/entity/note";
import { NoteRepository } from "@apps/note/domain/port/persistence/repository";
import { err, ok, Result } from "neverthrow";
import { GetNoteByIdUseCase, NoteIdReq } from "../port/usecase/";
import { NoteNotFoundException } from "../exception/not-found.exception";

export class GetNoteByIdInteractor implements GetNoteByIdUseCase {
  constructor(
    @inject(NoteDIToken.NOTE_REPOSITORY) private repo: NoteRepository,
  ) {}

  async execute(payload: NoteIdReq): Promise<Result<Note, Error>> {
    const note = await this.repo.getNoteById(payload.id);

    if (!note) {
      return err(new NoteNotFoundException());
    }

    return ok(note.toPlainObject());
  }
}
