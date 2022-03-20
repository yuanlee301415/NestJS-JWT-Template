import { Types } from "mongoose";
import { Length, IsArray, IsMongoId } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";

export class UpdateCitDto {
  @NotBlank()
  @Length(2, 10)
  readonly displayName: string;

  /**
   * 验证：Mongo id 数组
   */
  @IsArray()
  @IsMongoId({ each: true })
  readonly bizTypes: Types.ObjectId[];
}
