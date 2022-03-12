import type { Document } from "mongoose";

import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { ApplicationDto } from "../dto/application.dto";
import { Category } from "../../category/schemas/category.schema";
import { User } from "../../user/schemas/user.schema";

@Schema({
  timestamps: true,
})
export class Application {
  @Prop({
    type: Number,
  })
  activeUser: number; // 活跃用户数

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  categories: mongoose.Schema.Types.ObjectId[]; // 类目

  @Prop({
    type: String,
  })
  logo: string; // Logo

  @Prop({
    type: Number,
  })
  newUser: number; // 新增用户数

  @Prop({
    type: String,
    index: true,
  })
  title: string; // 标题

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  createdBy: mongoose.Schema.Types.ObjectId;

  constructor(application: ApplicationDto) {
    this.activeUser = application.activeUser;
    this.categories = application.categories;
    this.logo = application.logo;
    this.newUser = application.newUser;
    this.title = application.title;
    this.createdBy = application.createdBy;
  }
}

export type ApplicationDocument = Application & Document;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
