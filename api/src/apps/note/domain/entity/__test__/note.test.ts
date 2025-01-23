import { Note } from "../note";
import { EntityInvalidException } from "@core/exceptions/exception.common";
import { UniqueID } from "@core/unique-id";
import { faker } from "@faker-js/faker";

describe("[Entity] Note", () => {
  it("should throw error when title is empty", async () => {
    expect(
      Note.create({
        title: faker.word.words(5),
        description: faker.word.words(20),
        archived: false,
        createdBy: new UniqueID(faker.string.uuid()),
      }),
    ).toBeDefined();
  });

  it("should throw error when title is empty", async () => {
    expect(() =>
      Note.create({
        title: "",
        description: faker.word.words(20),
        archived: false,
        createdBy: new UniqueID(faker.string.uuid()),
      }),
    ).toThrow(EntityInvalidException);
  });
});
