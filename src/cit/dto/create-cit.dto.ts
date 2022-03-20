import { Types } from "mongoose";
import { Length, IsArray, IsMongoId, Matches } from "class-validator";

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

  /**
   * 验证：Mongo id 数组
   */
  @IsArray()
  @IsMongoId({ each: true })
  readonly bizTypes: Types.ObjectId[];
}
