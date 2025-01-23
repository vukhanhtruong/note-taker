import { container } from "tsyringe";
import { CreateNoteProps, Note } from "../../entity/note";
import { NoteRepository } from "../../port/persistence/repository";
import { NoteDIToken } from "../../note.token";
import { CreateNewNoteUseCase } from "@apps/note/domain/port/usecase";
import { faker } from "@faker-js/faker";
import { UniqueID } from "@core/unique-id";
import { NoteNotFoundException } from "@apps/note/domain/exception/not-found.exception";
import { UpdateNoteInteractor } from "../update-note.interactor";

describe("NoteService ", () => {
  let noteRepo: jest.Mocked<NoteRepository>;
  let noteService: CreateNewNoteUseCase;
  const existingId = faker.string.uuid();

  const existingNote = (note?: Partial<CreateNoteProps>): Note => {
    const res = Note.create(
      {
        title: faker.lorem.sentences(),
        description: faker.word.words(20),
        archived: false,
        createdBy: new UniqueID(existingId),
        ...note,
      },
      new UniqueID(existingId),
    );

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

    noteService = new UpdateNoteInteractor(
      container.resolve(NoteDIToken.NOTE_REPOSITORY),
    );
  });

  describe("updateNote", () => {
    it("should update a note successfully", async () => {
      const updateExistingNote = existingNote();
      noteRepo.getNoteById.mockResolvedValue(updateExistingNote);
      noteRepo.updateNote.mockResolvedValue(updateExistingNote);

      const result = await noteService.execute(updateExistingNote);
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual(updateExistingNote.toPlainObject());
      }

      expect(noteRepo.updateNote).toHaveBeenCalledTimes(1);
    });

    it("should throw note not found error", async () => {
      noteRepo.getNoteById.mockResolvedValue(null);

      const result = await noteService.execute({
        title: faker.lorem.sentences(),
        description: faker.word.words(20),
        archived: false,
        createdBy: new UniqueID(),
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(NoteNotFoundException);
      }
    });
  });
});
