import { DependencyContainer } from "tsyringe";
import { UserDIToken } from "./domain/user.token";
import { UserRepository } from "./domain/port/persistence/repository";
import { UserRepositoryImplement } from "./infra/d1/user.repository";
import { AppToken } from "../app.token";
import { SignInUseCase, SignUpUseCase } from "./domain/port/usecase";
import { SignInInteractor } from "./domain/interactor/signin.interactor";
import { SignUpInteractor } from "./domain/interactor/signup.interactor";

export const UserProvider = {
  register(container: DependencyContainer) {
    container.register(UserDIToken.USER_REPOSITORY, {
      useFactory: (): UserRepository =>
        new UserRepositoryImplement(container.resolve(AppToken.ORM_CLIENT)),
    });

    container.register<SignInUseCase>(UserDIToken.SIGN_IN_USECASE, {
      useFactory: () =>
        new SignInInteractor(container.resolve(UserDIToken.USER_REPOSITORY)),
    });

    container.register<SignUpUseCase>(UserDIToken.SIGN_UP_USECASE, {
      useFactory: () =>
        new SignUpInteractor(container.resolve(UserDIToken.USER_REPOSITORY)),
    });
  },
};
