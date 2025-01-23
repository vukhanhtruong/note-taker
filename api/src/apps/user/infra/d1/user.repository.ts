import { inject, injectable } from "tsyringe";
import { User } from "@apps/user/domain/entity/user";
import { AppToken } from "../../../app.token";
import { PrismaClient } from "@prisma/client";
import { UserMapper } from "./user.mapper";
import { UserRepository } from "@apps/user/domain/port/persistence/repository";

injectable();
export class UserRepositoryImplement implements UserRepository {
  constructor(@inject(AppToken.ORM_CLIENT) private orm: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.orm.user.findUnique({ where: { email } });

    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    await this.orm.user.create({
      data: {
        name: user.name,
        email: user.email,
        salt: user.salt,
        password: user.password,
        role: user.role,
      },
    });

    return user;
  }
}
