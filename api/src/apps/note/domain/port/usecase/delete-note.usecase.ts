import { UseCase } from "@core/usecase";
import { UniqueID } from "@core/unique-id";
import { Note } from "../../entity/note";

export type DeleteNoteReq = {
  userId: UniqueID;
  noteId: UniqueID;
};
export type DeleteNoteUseCase = UseCase<DeleteNoteReq, Note>;
