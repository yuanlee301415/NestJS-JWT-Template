import { MaxLength, IsIn, IsNotEmpty, IsMongoId } from "class-validator";
import * as mongoose from "mongoose";

import { NotBlank } from "../../common/validator/NotBlank";

export class ProgressDto {
  @NotBlank()
  readonly cost: number;

  @IsNotEmpty()
  @IsMongoId()
  readonly operator: mongoose.Schema.Types.ObjectId;

  @NotBlank()
  @MaxLength(50)
  readonly rate: string;

  @NotBlank()
  @IsIn([0, 1])
  readonly status: number;

  @NotBlank()
  @MaxLength(50)
  readonly time: Date;
}
