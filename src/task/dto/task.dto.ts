import * as mongoose from "mongoose";
import { MaxLength, IsOptional, IsMongoId, IsNotEmpty } from "class-validator";
import { NotBlank } from "../../common/validator/NotBlank";

export class TaskDto {
  @NotBlank()
  @MaxLength(50)
  readonly title: string;

  @NotBlank()
  @MaxLength(30)
  readonly startTime: Date;

  @NotBlank()
  @MaxLength(50)
  readonly logo: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly owner: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @MaxLength(200)
  readonly subDescription: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}
