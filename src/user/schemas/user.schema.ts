import type { Document } from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { CreateUserDto } from "../dto/create-user.dto";

@Schema({
  timestamps: true,
})
export class User {
  _id: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  mobile: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
  })
  avatar: string;

  @Prop({
    type: String,
  })
  signature: string;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: Array,
  })
  tags: string[];

  @Prop({
    type: String,
  })
  country: string;

  @Prop({
    type: String,
  })
  province: string;

  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: String,
  })
  tel: string;

  @Prop({
    type: Array,
  })
  roles: string;

  constructor(user: CreateUserDto) {
    this.username = user.username;
    this.email = user.email;
    this.mobile = user.mobile;
    this.password = user.password;
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
