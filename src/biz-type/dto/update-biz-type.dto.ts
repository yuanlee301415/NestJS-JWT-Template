import { Length, IsOptional } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";

export class UpdateBizTypeDto {
  @NotBlank()
  @Length(2, 10)
  readonly displayName?: string;

  @IsOptional()
  @Length(2, 50)
  readonly desc?: string;
}
