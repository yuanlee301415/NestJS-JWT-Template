import * as mongoose from "mongoose";
import { IsMongoId, IsOptional } from "class-validator";

export class ProjectDto {
  readonly cover: string;
  readonly description: string;
  readonly members: mongoose.Schema.Types.ObjectId[];
  readonly title: string;

  @IsOptional()
  @IsMongoId()
  readonly createdBy: mongoose.Schema.Types.ObjectId;
}
