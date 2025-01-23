import { container } from "tsyringe";
import { Note } from "../../entity/note";
import { NoteRepository } from "../../port/persistence/repository";
import { NoteDIToken } from "../../note.token";
import { faker } from "@faker-js/faker";
import { UniqueID } from "@core/unique-id";
import { GetNoteByIdInteractor } from "../get-note-by-id.interactor";
import { NoteNotFoundException } from "../../exception/not-found.exception";

describe("NoteService ", () => {
  let mockContext: any;
  let noteRepo: jest.Mocked<NoteRepository>;
  let noteService: GetNoteByIdInteractor;

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

    noteService = new GetNoteByIdInteractor(
      container.resolve(NoteDIToken.NOTE_REPOSITORY),
    );
  });

  describe("getNotesList", () => {
    it("should return a list of notes", async () => {
      const note: Note = newNote();
      noteRepo.getNoteById.mockResolvedValueOnce(note);

      const result = await noteService.execute({ id: new UniqueID() });

      expect(noteRepo.getNoteById).toHaveBeenCalledTimes(1);
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toHaveProperty("id");
        expect(result.value).toHaveProperty("title");
        expect(result.value).toHaveProperty("description");
        expect(result.value).toHaveProperty("archived");
        expect(result.value).toHaveProperty("createdBy");
      }
    });

    it("should returns empty note object", async () => {
      noteRepo.getNotesByUserId.mockResolvedValueOnce([]);

      const result = await noteService.execute({ id: new UniqueID() });

      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(NoteNotFoundException);
      }
    });
  });
});
