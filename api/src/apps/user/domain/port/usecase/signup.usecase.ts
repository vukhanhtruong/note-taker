import { User, CreateUserProps } from "../../entity/user";
import { Result } from "neverthrow";

export type SignUpReq = Pick<CreateUserProps, "email" | "password">;

export interface SignUpUseCase {
  execute(body: SignUpReq): Promise<Result<User, Error>>;
}
