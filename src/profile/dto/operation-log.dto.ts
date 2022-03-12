import { MaxLength, IsIn, IsNotEmpty, IsMongoId } from "class-validator";
import * as mongoose from "mongoose";
import { NotBlank } from "../../common/validator/NotBlank";

export class OperationLogDto {
  @NotBlank()
  @MaxLength(100)
  readonly memo: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly operator: mongoose.Schema.Types.ObjectId;

  @NotBlank()
  @IsIn([0, 1])
  readonly status: number;

  @NotBlank()
  @MaxLength(20)
  readonly type: string;
}
