import { DependencyContainer } from "tsyringe";
import {
  CreateNewNoteUseCase,
  DeleteNoteUseCase,
  GetNoteByIdUseCase,
  GetNotesListUseCase,
} from "./domain/port/usecase";
import { NoteDIToken } from "./domain/note.token";
import { NoteRepositoryImplement } from "./infra/d1/note.repository";
import { AppToken } from "../app.token";
import { NoteRepository } from "./domain/port/persistence/repository";
import {
  CreateNewNoteInteractor,
  DeleteNoteInteractor,
  GetNotesListInteractor,
} from "./domain/interactor";
import { UpdateNoteUseCase } from "./domain/port/usecase/update-note.usecase";
import { UpdateNoteInteractor } from "./domain/interactor/";
import { GetNoteByIdInteractor } from "./domain/interactor/get-note-by-id.interactor";

export const NoteProvider = {
  register(container: DependencyContainer) {
    container.register(NoteDIToken.NOTE_REPOSITORY, {
      useFactory: (): NoteRepository =>
        new NoteRepositoryImplement(container.resolve(AppToken.ORM_CLIENT)),
    });

    container.register<CreateNewNoteUseCase>(NoteDIToken.CREATE_NOTE_USECASE, {
      useFactory: (): CreateNewNoteUseCase =>
        new CreateNewNoteInteractor(
          container.resolve(NoteDIToken.NOTE_REPOSITORY),
        ),
    });

    container.register<UpdateNoteUseCase>(NoteDIToken.UPDATE_NOTE_USECASE, {
      useFactory: (): UpdateNoteUseCase =>
        new UpdateNoteInteractor(
          container.resolve(NoteDIToken.NOTE_REPOSITORY),
        ),
    });

    container.register<DeleteNoteUseCase>(NoteDIToken.DELETE_NOTE_USECASE, {
      useFactory: () =>
        new DeleteNoteInteractor(
          container.resolve(NoteDIToken.NOTE_REPOSITORY),
        ),
    });

    container.register<GetNoteByIdUseCase>(NoteDIToken.GET_NOTE_BY_ID_USECASE, {
      useFactory: () =>
        new GetNoteByIdInteractor(
          container.resolve(NoteDIToken.NOTE_REPOSITORY),
        ),
    });

    container.register<GetNotesListUseCase>(
      NoteDIToken.GET_NOTE_LISTS_USECASE,
      {
        useFactory: () =>
          new GetNotesListInteractor(
            container.resolve(NoteDIToken.NOTE_REPOSITORY),
          ),
      },
    );
  },
};
