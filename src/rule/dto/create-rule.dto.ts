import * as mongoose from "mongoose";
import { IsMongoId, Length, IsOptional } from "class-validator";
import { NotBlank } from "../../common/validator/NotBlank";

export class CreateRuleDto {
  @NotBlank()
  @Length(2, 50)
  readonly name: string;

  @NotBlank()
  @Length(5, 100)
  readonly desc: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}
