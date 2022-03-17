import { Length, IsBoolean, IsOptional, IsMongoId } from "class-validator";
import { Types } from "mongoose";

import { NotBlank } from "@/common/validator/NotBlank";

export class CreateBizTypeDto {
  @NotBlank()
  @Length(2, 10)
  readonly name: string;

  @NotBlank()
  @Length(2, 10)
  readonly displayName: string;

  @IsOptional()
  @IsBoolean()
  readonly system: boolean;

  @IsOptional()
  @Length(2, 50)
  readonly desc?: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy?: Types.ObjectId;
}
