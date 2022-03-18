import { Length, IsBoolean, IsOptional, Matches } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";
import { NAME_REG } from "@/constants";

export class CreateBizTypeDto {
  @Length(2, 10)
  @Matches(NAME_REG)
  readonly name: string;

  @NotBlank()
  @Length(2, 10)
  readonly displayName: string;

  @IsOptional()
  @IsBoolean()
  readonly system?: boolean;

  @IsOptional()
  @NotBlank()
  @Length(2, 50)
  readonly desc?: string;
}
