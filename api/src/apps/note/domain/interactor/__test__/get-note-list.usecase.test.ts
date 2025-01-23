import { container } from "tsyringe";
import { Note } from "../../entity/note";
import { NoteRepository } from "../../port/persistence/repository";
import { NoteDIToken } from "../../note.token";
import { faker } from "@faker-js/faker";
import { GetNotesListInteractor } from "../get-notes-list.interactor";
import { InternalServerErrorException } from "@core/exceptions/exception.common";
import { UniqueID } from "@core/unique-id";

describe("NoteService ", () => {
  let mockContext: any;
  let noteRepo: jest.Mocked<NoteRepository>;
  let noteService: GetNotesListInteractor;

  const newNote = (): Note => {
    const res = Note.create({
      title: faker.lorem.sentences(),
      description: faker.word.words(20),
      archived: false,
      createdBy: new UniqueID(faker.string.uuid()),
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

    mockContext = {
      json: jest.fn(),
    };

    container.register<NoteRepository>(NoteDIToken.NOTE_REPOSITORY, {
      useValue: noteRepo,
    });

    noteService = new GetNotesListInteractor(
      container.resolve(NoteDIToken.NOTE_REPOSITORY),
    );
  });

  describe("getNotesList", () => {
    it("should return a list of notes", async () => {
      const notes: Note[] = [newNote(), newNote()];
      noteRepo.getNotesByUserId.mockResolvedValueOnce(notes);

      const result = await noteService.execute({ userId: new UniqueID() });

      expect(noteRepo.getNotesByUserId).toHaveBeenCalledTimes(1);
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.length).toEqual(2);
        expect(result.value).toEqual(notes.map((t) => t.toPlainObject()));
      }
    });

    it("should returns empty array", async () => {
      noteRepo.getNotesByUserId.mockResolvedValueOnce([]);

      const result = await noteService.execute({ userId: new UniqueID() });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.length).toEqual(0);
      }
    });

    it("should throw error", async () => {
      noteRepo.getNotesByUserId.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(
        noteService.execute({ userId: new UniqueID() }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
