import { Length } from "class-validator";

export class CreateUserDto {
  @Length(5, 20)
  readonly username: string;

  @Length(6, 20)
  readonly email: string;

  @Length(11, 11)
  readonly mobile: string;

  @Length(6, 20)
  readonly password: string;
}
