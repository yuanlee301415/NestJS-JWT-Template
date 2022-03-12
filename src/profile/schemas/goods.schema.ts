import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { GoodsDto } from "../dto/goods.dto";

@Schema({
  timestamps: true,
})
export class Goods {
  @Prop({
    type: Number,
  })
  amount: number;

  @Prop({
    type: String,
  })
  barcode: string;

  @Prop({
    type: String,
    index: true,
  })
  name: string;

  @Prop({
    type: Number,
  })
  num: number;

  @Prop({
    type: String,
  })
  no: string;

  @Prop({
    type: Number,
  })
  price: number;

  constructor(goods: GoodsDto) {
    this.amount = goods.amount;
    this.barcode = goods.barcode;
    this.name = goods.name;
    this.num = goods.num;
    this.no = goods.no;
    this.price = goods.price;
    // console.log("new goods:", this);
  }
}

export type GoodsDocument = Goods & Document;
export const GoodsSchema = SchemaFactory.createForClass(Goods);
