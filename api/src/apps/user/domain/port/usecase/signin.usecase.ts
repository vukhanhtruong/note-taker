import { Result } from "neverthrow";
import { CreateUserProps, User } from "../../entity/user";

export type UserWithToken = { token: string; user: User };
export type SignInReq = Pick<CreateUserProps, "email" | "password">;
export interface SignInUseCase {
  execute(
    body: SignInReq,
    jwtSecret: string,
  ): Promise<Result<UserWithToken, Error>>;
}
