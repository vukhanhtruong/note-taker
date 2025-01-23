import { inject } from "tsyringe";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Note, UpdateNoteProps } from "@apps/note/domain/entity/note";
import { NoteRepository } from "@apps/note/domain/port/persistence/repository";
import { err, ok, Result } from "neverthrow";
import { UpdateNoteUseCase } from "@apps/note/domain/port/usecase/update-note.usecase";
import { NoteNotFoundException } from "@apps/note/domain/exception/not-found.exception";

export class UpdateNoteInteractor implements UpdateNoteUseCase {
  constructor(
    @inject(NoteDIToken.NOTE_REPOSITORY) private repo: NoteRepository,
  ) {}

  async execute(payload: UpdateNoteProps): Promise<Result<Note, Error>> {
    const noteFound = await this.repo.getNoteById(payload.id);

    if (!noteFound || !noteFound.createdBy.equals(payload.createdBy)) {
      return err(new NoteNotFoundException());
    }

    const existingNote = Note.create(payload, payload.id);
    const note = await this.repo.updateNote(existingNote);

    return ok(note.toPlainObject());
  }
}
