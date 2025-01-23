import { User } from "../user";
import { EntityInvalidException } from "@core/exceptions/exception.common";
import { faker } from "@faker-js/faker";
import { CryptoService } from "@core/crypto";

describe("[Entity] Note", () => {
  it("should be define", async () => {
    expect(
      User.create({
        name: faker.word.words(5),
        password: await CryptoService.hashPassword(
          faker.internet.password(),
          "salt",
        ),
        email: faker.internet.email(),
      }),
    ).toBeDefined();
  });

  it("should throw error when email is empty", async () => {
    expect(() =>
      User.create({
        name: "",
        password: faker.internet.password(),
        email: "",
      }),
    ).toThrow(EntityInvalidException);
  });

  it("should throw error when email is wrong format", async () => {
    expect(() =>
      User.create({
        name: "",
        password: faker.internet.password(),
        email: "abc@email",
      }),
    ).toThrow(EntityInvalidException);
  });

  it("should return truthy if password matched, falsy if does not", async () => {
    const testPassword = "hello";
    const testSalt = faker.word.words();
    const instance = User.create({
      email: faker.internet.email(),
      password: await CryptoService.hashPassword(testPassword, testSalt),
      salt: testSalt,
    });
    const passwordMatched = await instance.comparePassword("hello");
    expect(passwordMatched).toBeTruthy();

    const passwordNotMatched = await instance.comparePassword("not-match-pass");
    expect(passwordNotMatched).toBeFalsy();
  });
});
