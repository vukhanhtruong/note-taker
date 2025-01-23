import { injectable } from "tsyringe";
import { SignInReq, SignInUseCase, UserWithToken } from "../port/usecase";
import { UserRepository } from "../port/persistence/repository";
import { PasswordNotCorrectException } from "../exception/password-not-correct.exception";
import { sign } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { UserNotFoundException } from "../exception/not-found.exception";
import { err, ok, Result } from "neverthrow";

@injectable()
export class SignInInteractor implements SignInUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    { email, password }: SignInReq,
    jwtSecret: string,
  ): Promise<Result<UserWithToken, Error>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return err(new UserNotFoundException());
    }

    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
      return err(new PasswordNotCorrectException());
    }

    const payload: JWTPayload = {
      sub: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, // Token expires in 6h
    };
    const token = await sign(payload, jwtSecret);

    return ok({ user: user.toPlainObject(), token });
  }
}
