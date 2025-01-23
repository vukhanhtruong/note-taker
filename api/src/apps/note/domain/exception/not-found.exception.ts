import { NotFoundException } from "@core/exceptions/exception.common";

export class NoteNotFoundException extends NotFoundException {
  static readonly customMessage = "Note Not Found";

  constructor(cause?: Error) {
    super(NoteNotFoundException.customMessage, cause);
  }
}
