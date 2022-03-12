import type { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "../../user/schemas/user.schema";
import { ProjectDto } from "../dto/project.dto";

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({
    type: String,
  })
  cover: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
      },
    ],
  })
  members: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: String,
    index: true,
  })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  createdBy: mongoose.Schema.Types.ObjectId;

  constructor(project: ProjectDto) {
    this.cover = project.cover;
    this.description = project.description;
    this.members = project.members;
    this.title = project.title;
    this.createdBy = project.createdBy;
  }
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
