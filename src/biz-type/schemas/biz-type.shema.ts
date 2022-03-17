import type { Document } from "mongoose";

import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "@/user/schemas/user.schema";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";

@Schema({
  timestamps: true,
})
export class BizType {
  @Prop({
    type: String,
    index: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  displayName: string;

  @Prop({
    type: Boolean,
  })
  system: boolean;

  @Prop({
    type: String,
  })
  desc: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  createdBy: Types.ObjectId;

  constructor(bizType: CreateBizTypeDto) {
    this.name = bizType.name;
    this.displayName = bizType.displayName;
    this.system = bizType.system;
    this.desc = bizType.desc;
    this.createdBy = bizType.createdBy;
  }
}

export type BizTypeDocument = BizType & Document;
export const BizTypeSchema = SchemaFactory.createForClass(BizType);
