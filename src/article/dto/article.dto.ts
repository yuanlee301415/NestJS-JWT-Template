import * as mongoose from "mongoose";
import { IsMongoId, IsOptional } from "class-validator";

export class ArticleDto {
  readonly categories: mongoose.Schema.Types.ObjectId[];
  readonly content: string;
  readonly href: string;
  readonly like: number;
  readonly message: number;
  readonly star: number;
  readonly tags: string[];
  readonly title: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}
