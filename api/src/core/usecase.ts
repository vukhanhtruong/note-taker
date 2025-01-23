import { Result } from "neverthrow";

export interface UseCase<TUseCasePort, TUseCaseResult> {
  execute(port?: TUseCasePort): Promise<Result<TUseCaseResult, Error>>;
}
