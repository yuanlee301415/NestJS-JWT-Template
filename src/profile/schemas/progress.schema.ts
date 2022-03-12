import type { Document } from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { User } from "../../user/schemas/user.schema";
import { ProgressDto } from "../dto/progress.dto";

@Schema({
  timestamps: true,
})
export class Progress {
  @Prop({
    type: Number,
  })
  cost: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  operator: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
  })
  rate: string;

  @Prop({
    type: Number,
  })
  status: number;

  @Prop({
    type: Date,
  })
  time: Date;

  constructor(progress: ProgressDto) {
    this.cost = progress.cost;
    this.operator = progress.operator;
    this.rate = progress.rate;
    this.status = progress.status;
    this.time = progress.time;
    // console.log("new progress:", this);
  }
}

export type ProgressDocument = Progress & Document;
export const ProgressSchema = SchemaFactory.createForClass(Progress);
