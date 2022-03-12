import type { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "../../user/schemas/user.schema";
import { OperationLogDto } from "../dto/operation-log.dto";

@Schema({
  timestamps: true,
})
export class OperationLog {
  @Prop({
    type: String,
  })
  memo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  operator: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
  })
  status: number;

  @Prop({
    type: String,
  })
  type: string;

  constructor(log: OperationLogDto) {
    this.memo = log.memo;
    this.operator = log.operator;
    this.status = log.status;
    this.type = log.type;
    // console.log("new log:", this);
  }
}

export type OperationLogDocument = OperationLog & Document;
export const OperationLogSchema = SchemaFactory.createForClass(OperationLog);
