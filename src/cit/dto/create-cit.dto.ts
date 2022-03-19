import { Types } from "mongoose";
import { Length, IsOptional, IsMongoId, Matches } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";
import { NAME_REG } from "@/constants";

export class CreateCitDto {
  @Matches(NAME_REG)
  readonly name: string;

  @NotBlank()
  @Length(2, 10)
  readonly displayName: string;

  @NotBlank()
  @Length(2, 10)
  readonly parentName: string;

  @NotBlank()
  @Length(2, 1000)
  readonly path: string;

  @IsMongoId()
  readonly bizTypes: Types.ObjectId[];
}
