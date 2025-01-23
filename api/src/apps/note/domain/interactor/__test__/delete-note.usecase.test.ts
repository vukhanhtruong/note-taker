import { container } from "tsyringe";
import { CreateNoteProps, Note } from "../../entity/note";
import { NoteRepository } from "../../port/persistence/repository";
import { NoteDIToken } from "../../note.token";
import { faker } from "@faker-js/faker";
import { InternalServerErrorException } from "@core/exceptions/exception.common";
import { DeleteNoteInteractor } from "../delete-note.interactor";
import { UniqueID } from "@core/unique-id";
import { NoteNotFoundException } from "@apps/note/domain/exception/not-found.exception";

describe("NoteService ", () => {
  let mockContext: any;
  let noteRepo: jest.Mocked<NoteRepository>;
  let noteService: DeleteNoteInteractor;

  const fakeUserId = new UniqueID(faker.string.uuid());
  const generateNewNote = (note?: Partial<CreateNoteProps>): Note => {
    const res = Note.create({
      title: faker.lorem.sentences(),
      description: faker.word.words(20),
      archived: false,
      createdBy: fakeUserId,
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

    mockContext = {
      json: jest.fn(),
    };

    container.register<NoteRepository>(NoteDIToken.NOTE_REPOSITORY, {
      useValue: noteRepo,
    });

    noteService = new DeleteNoteInteractor(
      container.resolve(NoteDIToken.NOTE_REPOSITORY),
    );
  });

  describe("deleteNote", () => {
    it("should delete a note and return the deleted note", async () => {
      const deletedNote: Note = generateNewNote();

      const deletedNoteId = new UniqueID(deletedNote.id);

      noteRepo.getNoteById.mockResolvedValue(deletedNote);
      noteRepo.deleteNote.mockResolvedValue(deletedNote);

      const result = await noteService.execute({
        noteId: deletedNoteId,
        userId: fakeUserId,
      });

      expect(result.isOk()).toEqual(true);
      if (result.isOk()) {
        expect(result.value).toEqual(deletedNote.toPlainObject());
      }

      expect(noteRepo.deleteNote).toHaveBeenCalledWith(deletedNoteId);
      expect(noteRepo.deleteNote).toHaveBeenCalledTimes(1);
    });

    it("should return note not found error", async () => {
      noteRepo.getNoteById.mockResolvedValue(null);

      const result = await noteService.execute({
        noteId: new UniqueID(),
        userId: fakeUserId,
      });
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(NoteNotFoundException);
      }
    });

    it("should throw error", async () => {
      const newNote = generateNewNote();
      noteRepo.getNoteById.mockResolvedValue(generateNewNote());
      noteRepo.deleteNote.mockRejectedValue(new InternalServerErrorException());

      await expect(
        noteService.execute({
          noteId: new UniqueID(newNote.id),
          userId: fakeUserId,
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
