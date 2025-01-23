import { container } from "tsyringe";
import { faker } from "@faker-js/faker";
import { UserRepository } from "@apps/user/domain/port/persistence/repository";
import { SignUpUseCase } from "@apps/user/domain/port/usecase";
import { UserDIToken } from "@apps/user/domain/user.token";
import { User } from "@apps/user/domain/entity/user";
import { CryptoService } from "@core/crypto";
import { SignUpInteractor } from "../signup.interactor";
import { UserAlreadyExistsException } from "@apps/user/domain/exception/already-exists.exception";

const fakeUser = async () => {
  const email = faker.internet.email();
  const testPassword = "hello";
  const testSalt = faker.word.words();
  const password = await CryptoService.hashPassword(testPassword, testSalt);

  const user = User.create({
    email,
    password,
    salt: testSalt,
  });

  return { user, password, plainPassword: testPassword };
};

describe("Sign-Up Service", () => {
  let repo: jest.Mocked<UserRepository>;
  let service: SignUpUseCase;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    container.register<UserRepository>(UserDIToken.USER_REPOSITORY, {
      useValue: repo,
    });

    service = new SignUpInteractor(
      container.resolve(UserDIToken.USER_REPOSITORY),
    );
  });

  it("should throws User Already Exist", async () => {
    const fake = await fakeUser();
    const { user } = fake;
    const { email } = user;
    const plainPassword = fake.plainPassword;

    repo.findByEmail.mockResolvedValue(user);

    const result = await service.execute({ email, password: plainPassword });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(UserAlreadyExistsException);
    }

    expect(repo.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("should return new User data", async () => {
    const { user } = await fakeUser();

    repo.findByEmail.mockResolvedValue(null);
    repo.create.mockResolvedValue(user);

    const { email, password } = user;
    const result = await service.execute({
      email,
      password,
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toHaveProperty("id");
      expect(result.value).toHaveProperty("name");
      expect(result.value).toHaveProperty("email");
      expect(result.value).toHaveProperty("role");
      expect(result.value).not.toHaveProperty("password"); //password will not be returned
      expect(result.value.email).toEqual(email);
    }
  });
});
