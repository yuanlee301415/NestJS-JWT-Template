import { Length, Matches } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";
import { NAME_REG, EMAIL_REG, MOBILE_REG } from "@/constants";

export class CreateUserDto {
  @Length(5, 20)
  @Matches(NAME_REG)
  readonly username: string;

  @Matches(EMAIL_REG)
  readonly email: string;

  @Matches(MOBILE_REG)
  readonly mobile: string;

  @Length(6, 20)
  readonly password: string;
}
