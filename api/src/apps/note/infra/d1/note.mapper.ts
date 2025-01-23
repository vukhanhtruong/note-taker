import { Note as PrismaNoteEntity, Prisma } from "@prisma/client";
import { Note } from "../../domain/entity/note";
import { UniqueID } from "@core/unique-id";

export class NoteMapper {
  static toDomain(entity: PrismaNoteEntity): Note {
    return Note.create(
      {
        title: entity.title,
        description: entity.description,
        archived: entity.archived,
        createdBy: new UniqueID(entity.createdBy),
      },
      new UniqueID(entity.id),
    );
  }

  static toORM(domainEntity: Note): Prisma.NoteCreateInput {
    return {
      id: domainEntity.id,
      title: domainEntity.title,
      description: domainEntity.description,
      createdBy: domainEntity.createdBy.toValue(),
      archived: domainEntity.archived,
    };
  }
}
