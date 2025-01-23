import { UniqueID } from "@core/unique-id";
import { Note } from "../../entity/note";

export type NoteMutateType = Omit<Note, "id">;

export interface NoteRepository {
  getNoteById(id: UniqueID): Promise<Note>;
  getNotesByUserId(userId: UniqueID): Promise<Note[]>;
  updateNote(note: Note): Promise<Note>;
  deleteNote(id: UniqueID): Promise<Note>;
  createNewNote(note: Note): Promise<Note>;
}
