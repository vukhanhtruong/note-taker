import { User as PrismaUserEntity } from "@prisma/client";
import { User, UserRole } from "@apps/user/domain/entity/user";
import { UniqueID } from "@core/unique-id";

export class UserMapper {
  static toDomain(entity: PrismaUserEntity): User {
    return User.create(
      {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        salt: entity.salt,
        role: entity.role as UserRole,
      },
      new UniqueID(entity.id),
    );
  }
}
