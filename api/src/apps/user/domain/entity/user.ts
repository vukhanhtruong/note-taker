import { Exclude, Expose } from "class-transformer";
import { UniqueID } from "@core/unique-id";
import { IsEmail, IsHash, IsNotEmpty } from "class-validator";
import { CryptoService } from "@core/crypto";
import { Entity } from "@core/entity";

export interface CreateUserProps {
  name?: string;
  email: string;
  password: string;
  salt?: string;
  role?: UserRole;
  activated?: boolean;
}

export enum UserRole {
  USER = "User",
}

export class User extends Entity<CreateUserProps> {
  constructor(props: CreateUserProps, id?: UniqueID) {
    super(props, id);
  }

  @Expose()
  @IsNotEmpty()
  get name(): string {
    return this.props.name;
  }

  @Exclude()
  @IsNotEmpty()
  @IsHash("sha256")
  get password(): string {
    return this.props.password;
  }

  @Exclude()
  get salt(): string {
    return this.props.salt;
  }

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  get email(): string {
    return this.props.email;
  }

  @Expose()
  @IsNotEmpty()
  get role(): string {
    return this.props.role;
  }

  static create(props: CreateUserProps, id?: UniqueID): User {
    const user = new User(
      {
        ...props,
        role: props.role ?? UserRole.USER,
        activated: props.activated ?? false,
        name: props.name ?? "noname",
      },
      id,
    );

    return user;
  }

  async comparePassword(password: string): Promise<boolean> {
    return await CryptoService.comparePasswords(
      password,
      this.password,
      this.salt,
    );
  }
}
