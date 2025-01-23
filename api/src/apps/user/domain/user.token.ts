export class UserDIToken {
  public static readonly USER_REPOSITORY: unique symbol =
    Symbol("USER_REPOSITORY");

  public static readonly SIGN_IN_USECASE: unique symbol =
    Symbol("SIGN_IN_USECASE");

  public static readonly SIGN_UP_USECASE: unique symbol =
    Symbol("SIGN_UP_USECASE");

  public static readonly UPGRADE_USER_ROLE_USECASE: unique symbol = Symbol(
    "UPGRADE_USER_ROLE_USECASE",
  );
}
