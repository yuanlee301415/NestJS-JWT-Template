import { MaxLength, Max } from "class-validator";
import { NotBlank } from "../../common/validator/NotBlank";

export class GoodsDto {
  @NotBlank()
  readonly amount: number;

  @NotBlank()
  @MaxLength(20)
  readonly barcode: string;

  @NotBlank()
  @MaxLength(50)
  readonly name: string;

  @NotBlank()
  @Max(99)
  readonly num: number;

  @NotBlank()
  @MaxLength(20)
  readonly no: string;

  @NotBlank()
  @Max(99999)
  readonly price: number;
}
