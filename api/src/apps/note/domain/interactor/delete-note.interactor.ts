import { inject } from "tsyringe";
import { NoteDIToken } from "@apps/note/domain/note.token";
import { Note } from "@apps/note/domain/entity/note";
import { NoteRepository } from "@apps/note/domain/port/persistence/repository";
import {
  DeleteNoteReq,
  DeleteNoteUseCase,
} from "@apps/note/domain/port/usecase";
import { UniqueID } from "@core/unique-id";
import { err, ok, Result } from "neverthrow";
import { NoteNotFoundException } from "@apps/note/domain/exception/not-found.exception";

export class DeleteNoteInteractor implements DeleteNoteUseCase {
  constructor(
    @inject(NoteDIToken.NOTE_REPOSITORY) private repo: NoteRepository,
  ) {}

  async execute(payload: DeleteNoteReq): Promise<Result<Note, Error>> {
    const noteFound = await this.repo.getNoteById(payload.noteId);

    if (!noteFound || !noteFound.createdBy.equals(payload.userId)) {
      return err(new NoteNotFoundException());
    }

    const deletedNote = await this.repo.deleteNote(new UniqueID(noteFound.id));

    return ok(deletedNote.toPlainObject());
  }
}
