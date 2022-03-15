import { Length } from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";

export class CreateResourceModelDto {
  @NotBlank()
  @Length(2, 10)
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

  readonly desc: string;

  readonly bizTypes: string[];
}
