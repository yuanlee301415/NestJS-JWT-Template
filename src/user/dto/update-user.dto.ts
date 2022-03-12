import { Length } from "class-validator";

export class CreateUserDto {
  @Length(5, 20)
  readonly username: string;

  readonly avatar: string;

  @Length(1, 50)
  readonly signature: string;

  @Length(0, 20)
  readonly title: string;

  @Length(0, 20)
  readonly country: string;

  @Length(0, 20)
  readonly province: string;

  @Length(0, 20)
  readonly city: string;

  @Length(0, 50)
  readonly address: string;

  @Length(0, 50)
  readonly tel: string;
}
