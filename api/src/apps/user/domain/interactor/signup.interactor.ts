import { CryptoService } from "@core/crypto";
import { User } from "../entity/user";
import { UserAlreadyExistsException } from "../exception/already-exists.exception";
import { UserRepository } from "../port/persistence/repository";
import { SignInReq, SignUpUseCase } from "../port/usecase";
import { ok, err, Result } from "neverthrow";

export class SignUpInteractor implements SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: SignInReq): Promise<Result<User, Error>> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return err(new UserAlreadyExistsException());
    }

    const salt = CryptoService.generateSalt();
    const hashPassword = await CryptoService.hashPassword(password, salt);

    const user = User.create({
      email,
      password: hashPassword,
      salt,
    });

    const createdUser = await this.userRepository.create(user);

    return ok(createdUser.toPlainObject());
  }
}
