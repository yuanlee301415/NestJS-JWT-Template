import type { Document } from "mongoose";

import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { CreateCitDto } from "@/cit/dto/create-cit.dto";
import { BizType } from "@/biz-type/schemas/biz-type.shema";

@Schema({
  timestamps: true,
})
export class Cit {
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
    type: String,
  })
  parentName: string;

  @Prop({
    type: String,
  })
  path: string;

  @Prop({
    /**
     * 关联 Mongo id 数组
     */
    type: [{ type: Types.ObjectId, ref: BizType.name }],
  })
  bizTypes: Types.ObjectId[];

  constructor(cit: CreateCitDto & { path: string }) {
    this.name = cit.name;
    this.displayName = cit.displayName;
    this.parentName = cit.parentName;
    this.bizTypes = cit.bizTypes;
    this.path = cit.path;
  }
}

export type CitDocument = Cit & Document;
export const CitSchema = SchemaFactory.createForClass(Cit);
