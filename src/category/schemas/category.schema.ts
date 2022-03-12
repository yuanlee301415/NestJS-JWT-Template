import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { CategoryDto } from "../dto/category.dto";

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    type: String,
    index: true,
  })
  name: string;

  constructor(category: CategoryDto) {
    this.name = category.name;
  }
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
