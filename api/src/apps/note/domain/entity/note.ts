import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { UniqueID } from "@core/unique-id";
import { Entity } from "@core/entity";

type UserId = UniqueID;

interface NoteProps {
  title: string | null;
  description?: string;
  archived: boolean;
  createdBy?: UserId;
}

export interface CreateNoteProps extends NoteProps {}

export interface UpdateNoteProps extends NoteProps {
  id: UniqueID;
}

export class Note extends Entity<NoteProps> {
  constructor(props: NoteProps, id?: UniqueID) {
    super(props, id);
  }

  @Expose()
  @IsNotEmpty()
  get title(): string {
    return this.props.title;
  }

  @Expose()
  get description(): string {
    return this.props.description;
  }

  @Expose()
  @IsBoolean()
  get archived(): boolean {
    return this.props.archived;
  }

  @Expose()
  @Transform(({ value }) => value.toValue())
  get createdBy(): UserId {
    return this.props.createdBy;
  }

  static create(note: CreateNoteProps, id?: UniqueID): Note {
    return new Note(note, id);
  }

  setStatus(newStatus: boolean) {
    this.props.archived = newStatus;
  }
}
