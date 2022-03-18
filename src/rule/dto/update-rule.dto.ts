import { Types } from "mongoose";
import {
  Length,
  MaxLength,
  IsOptional,
  IsIn,
  IsMongoId,
} from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";

export class UpdateRuleDto {
  @NotBlank()
  @Length(2, 50)
  readonly name: string;

  @NotBlank()
  @Length(5, 100)
  readonly desc: string;

  @NotBlank()
  @MaxLength(50)
  readonly startTime: Date;

  @IsOptional()
  @MaxLength(100)
  readonly target?: string;

  @IsOptional()
  @MaxLength(100)
  readonly template?: string;

  @IsOptional()
  @IsIn([0, 1])
  readonly type?: number;

  @IsOptional()
  @MaxLength(100)
  readonly frequency?: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy?: Types.ObjectId;
}
