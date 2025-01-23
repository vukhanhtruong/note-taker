export class NoteDIToken {
  public static readonly NOTE_REPOSITORY: unique symbol =
    Symbol("NOTE_REPOSITORY");

  public static readonly CREATE_NOTE_USECASE: unique symbol = Symbol(
    "CREATE_NOTE_USECASE",
  );
  public static readonly UPDATE_NOTE_USECASE: unique symbol = Symbol(
    "UPDATE_NOTE_USECASE",
  );
  public static readonly DELETE_NOTE_USECASE: unique symbol = Symbol(
    "DELETE_NOTE_USECASE",
  );
  public static readonly GET_NOTE_LISTS_USECASE: unique symbol = Symbol(
    "GET_NOTES_LIST_USECASE",
  );
  public static readonly GET_NOTE_BY_ID_USECASE: unique symbol = Symbol(
    "GET_NOTE_BY_ID_USECASE",
  );
  public static readonly MARK_AS_COMPLETED_USECASE: unique symbol = Symbol(
    "MARK_AS_COMPLETED_USECASE",
  );
}
