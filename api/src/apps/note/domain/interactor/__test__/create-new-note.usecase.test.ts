import { container } from "tsyringe";
import { CreateNoteProps, Note } from "../../entity/note";
import { NoteRepository } from "../../port/persistence/repository";
import { NoteDIToken } from "../../note.token";
import { CreateNewNoteUseCase } from "@apps/note/domain/port/usecase";
import { CreateNewNoteInteractor } from "../create-new-note.interactor";
import { InternalServerErrorException } from "@core/exceptions/exception.common";
import { faker } from "@faker-js/faker";
import { UniqueID } from "@core/unique-id";

describe("NoteService ", () => {
  let noteRepo: jest.Mocked<NoteRepository>;
  let noteService: CreateNewNoteUseCase;

  const newNote = (note?: Partial<CreateNoteProps>): Note => {
    const res = Note.create({
      title: faker.lorem.sentences(),
      description: faker.word.words(20),
      archived: false,
      createdBy: new UniqueID(faker.string.uuid()),
      ...note,
    });

    return res;
  };

  beforeEach(() => {
    noteRepo = {
      getNoteById: jest.fn(),
      getNotesByUserId: jest.fn(),
      updateNote: jest.fn(),
      deleteNote: jest.fn(),
      createNewNote: jest.fn(),
    };

    container.register<NoteRepository>(NoteDIToken.NOTE_REPOSITORY, {
      useValue: noteRepo,
    });

    noteService = new CreateNewNoteInteractor(
      container.resolve(NoteDIToken.NOTE_REPOSITORY),
    );
  });

  describe("createNewNote", () => {
    it("should create a new note", async () => {
      const createdNote = newNote();

      noteRepo.createNewNote.mockResolvedValue(createdNote);

      const result = await noteService.execute(createdNote);
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual(createdNote.toPlainObject());
      }

      expect(noteRepo.createNewNote).toHaveBeenCalledTimes(1);
    });

    it("should throw error", async () => {
      noteRepo.createNewNote.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(noteService.execute(newNote())).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
