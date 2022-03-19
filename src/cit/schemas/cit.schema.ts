import type { Document } from "mongoose";

import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { CreateCitDto } from "@/cit/dto/create-cit.dto";

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
    type: Array,
  })
  bizTypes: Types.ObjectId[];

  constructor(cit: CreateCitDto) {
    this.name = cit.name;
    this.displayName = cit.displayName;
    this.parentName = cit.parentName;
    this.path = cit.path;
    this.bizTypes = cit.bizTypes;
  }
}

export type CitDocument = Cit & Document;
export const CitSchema = SchemaFactory.createForClass(Cit);
