// 应用
import * as mongoose from "mongoose";
import { IsMongoId, IsOptional } from "class-validator";

export class ApplicationDto {
  readonly activeUser: number;
  readonly categories: mongoose.Schema.Types.ObjectId[];
  readonly logo: string;
  readonly newUser: number;
  readonly title: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}
