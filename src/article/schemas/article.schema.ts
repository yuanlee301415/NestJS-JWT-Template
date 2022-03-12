import type { Document } from "mongoose";

import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "../../user/schemas/user.schema";
import { Category } from "../../category/schemas/category.schema";
import { ArticleDto } from "../dto/article.dto";

@Schema({
  timestamps: true,
})
export class Article {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  categories: mongoose.Schema.Types.ObjectId[]; // 类目

  @Prop({
    type: String,
  })
  content: string; // 内容

  @Prop({
    type: String,
  })
  href: string; // 链接

  @Prop({
    type: Number,
  })
  like: number; // 喜欢

  @Prop({
    type: Number,
  })
  message: number; // 消息数

  @Prop({
    type: Number,
    default: 1,
  })
  star: number; // 点赞数
  @Prop({
    type: Array,
  })
  tags: string[]; // 标签

  @Prop({
    type: String,
    index: true, // 索引
  })
  title: string; // 标题

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createdBy: mongoose.Schema.Types.ObjectId;

  constructor(article: ArticleDto) {
    this.categories = article.categories;
    this.content = article.content;
    this.href = article.href;
    this.like = article.like;
    this.message = article.message;
    this.star = article.star;
    this.tags = article.tags;
    this.title = article.title;
    this.createdBy = article.createdBy;
    // console.log("Article>this:", this);
  }
}

export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);
