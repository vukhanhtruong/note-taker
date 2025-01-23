import { Expose, TransformInstanceToPlain } from "class-transformer";
import { EntityInvalidException } from "./exceptions/exception.common";
import { validateSync } from "class-validator";
import { UniqueID } from "./unique-id";

export abstract class Entity<Props> {
  protected readonly _id: UniqueID;
  protected props: Props;

  protected constructor(props: Props, id?: UniqueID) {
    this._id = id ? id : new UniqueID();
    this.props = props;
    this.validate();
  }

  @Expose()
  get id(): string {
    return this._id.toValue();
  }

  private validate() {
    const errors = validateSync(this);

    if (errors.length) {
      throw new EntityInvalidException("Invalidate Entity", errors);
    }
  }

  @TransformInstanceToPlain({
    excludePrefixes: ["props", "_domainEvents", "_id"],
  })
  public toPlainObject() {
    return this;
  }
}
