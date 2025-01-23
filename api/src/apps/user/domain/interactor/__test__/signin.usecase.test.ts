import { container } from "tsyringe";
import { faker } from "@faker-js/faker";
import { UserRepository } from "@apps/user/domain/port/persistence/repository";
import { SignInUseCase } from "@apps/user/domain/port/usecase";
import { UserDIToken } from "@apps/user/domain/user.token";
import { SignInInteractor } from "../signin.interactor";
import { User } from "@apps/user/domain/entity/user";
import { CryptoService } from "@core/crypto";
import { UserNotFoundException } from "@apps/user/domain/exception/not-found.exception";
import { PasswordNotCorrectException } from "@apps/user/domain/exception/password-not-correct.exception";

const fakeUser = async () => {
  const email = faker.internet.email();
  const testPassword = "hello";
  const testSalt = faker.word.words();
  const user = User.create({
    email,
    password: await CryptoService.hashPassword(testPassword, testSalt),
    salt: testSalt,
  });

  return { user, plainPassword: testPassword };
};

describe("Sign-In Service", () => {
  let repo: jest.Mocked<UserRepository>;
  let service: SignInUseCase;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    container.register<UserRepository>(UserDIToken.USER_REPOSITORY, {
      useValue: repo,
    });

    service = new SignInInteractor(
      container.resolve(UserDIToken.USER_REPOSITORY),
    );
  });

  it("should signin successfully", async () => {
    const fake = await fakeUser();
    const { user } = fake;
    const { salt, email } = user;
    const plainPassword = fake.plainPassword;

    repo.findByEmail.mockResolvedValue(user);

    const result = await service.execute(
      { email, password: plainPassword },
      salt,
    );

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.user).toEqual(user.toPlainObject());
      expect(result.value).toHaveProperty("token");
      expect(result.value.token).not.toBeNull();
    }

    expect(repo.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("should throws User Not Found", async () => {
    repo.findByEmail.mockResolvedValue(null);

    const result = await service.execute(
      { email: faker.internet.email(), password: faker.internet.password() },
      faker.string.nanoid(),
    );

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(UserNotFoundException);
    }

    expect(repo.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("should throws Password Not Correct", async () => {
    const fake = await fakeUser();
    const { user } = fake;
    const { salt, email } = user;

    repo.findByEmail.mockResolvedValue(user);

    const result = await service.execute(
      { email, password: "not-matched-password" },
      salt,
    );

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(PasswordNotCorrectException);
    }
  });
});
