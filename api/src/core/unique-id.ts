import { v4 as uuidv4 } from "uuid";

export class UniqueID {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? uuidv4();
  }

  public equals(id: UniqueID) {
    return id.toValue() === this.value;
  }
}
