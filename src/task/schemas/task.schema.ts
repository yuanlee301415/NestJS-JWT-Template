import type { Document } from "mongoose";

import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "@/user/schemas/user.schema";
import { TaskDto } from "../dto/task.dto";

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  title: string;

  @Prop({
    type: Date,
    required: true,
    // transform: (v) => v.getTime(),
  })
  startTime: Date;

  @Prop({
    type: String,
    required: true,
  })
  logo: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({
    type: Number,
  })
  percent: number;

  @Prop({
    type: Number,
  })
  status: number;

  @Prop({
    type: String,
  })
  subDescription?: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  createdBy?: Types.ObjectId;

  constructor(task: TaskDto) {
    this.title = task.title;
    this.startTime = task.startTime;
    this.logo = task.logo;
    this.owner = task.owner;
    this.percent = (Math.random() * 100) | 0;
    this.status = (this.percent / 25) | 0;
    this.subDescription = task.subDescription;
    this.createdBy = task.createdBy;
  }
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
