import { UserSignInHandler } from "./signin.handler";
import { UserSignUpHandler } from "./signup.handler";

export const userRoutes = (app) => {
  app.post("/users/signup", UserSignUpHandler);
  app.post("/users/signin", UserSignInHandler);
};
