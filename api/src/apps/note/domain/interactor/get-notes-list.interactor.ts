import { inject } from "tsyringe";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Note } from "@apps/note/domain/entity/note";
import { NoteRepository } from "@apps/note/domain/port/persistence/repository";
import {
  GetNotesListUseCase,
  QueryNotesReq,
} from "@apps/note/domain/port/usecase";
import { ok, Result } from "neverthrow";

export class GetNotesListInteractor implements GetNotesListUseCase {
  constructor(
    @inject(NoteDIToken.NOTE_REPOSITORY) private repo: NoteRepository,
  ) {}

  async execute(payload: QueryNotesReq): Promise<Result<Note[], Error>> {
    const notes = await this.repo.getNotesByUserId(payload.userId);

    if (notes.length) return ok(notes.map((note) => note.toPlainObject()));

    return ok([]);
  }
}
