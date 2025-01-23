import { inject } from "tsyringe";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { CreateNoteProps, Note } from "@apps/note/domain/entity/note";
import { NoteRepository } from "@apps/note/domain/port/persistence/repository";
import { CreateNewNoteUseCase } from "@apps/note/domain/port/usecase";
import { ok, Result } from "neverthrow";

export class CreateNewNoteInteractor implements CreateNewNoteUseCase {
  constructor(
    @inject(NoteDIToken.NOTE_REPOSITORY) private repo: NoteRepository,
  ) {}

  async execute(payload: CreateNoteProps): Promise<Result<Note, Error>> {
    const newNote = Note.create(payload);
    const note = await this.repo.createNewNote(newNote);

    return ok(note.toPlainObject());
  }
}
