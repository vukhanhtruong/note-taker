import { Note, UpdateNoteProps } from "../../entity/note";
import { UseCase } from "@core/usecase";

export type UpdateNoteUseCase = UseCase<UpdateNoteProps, Note>;
