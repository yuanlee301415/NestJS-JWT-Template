import { Length, IsBoolean, IsOptional } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";

export class CreateBizTypeDto {
  @NotBlank()
  @Length(2, 10)
  readonly name: string;

  @NotBlank()
  @Length(2, 10)
  readonly displayName: string;

  // @IsOptional()
  @IsBoolean()
  readonly system: boolean;

  // @IsOptional()
  @Length(2, 50)
  readonly desc: string;

  readonly bizTypes: string[];
}
