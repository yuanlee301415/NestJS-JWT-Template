import type { Document } from "mongoose";

import { BadRequestException } from "@nestjs/common";
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
    index: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  mobile: string;

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
    const RE = /^[a-z]\w{4,20}$/i;
    if (!RE.test(user.username)) {
      throw new BadRequestException(
        `[User.username failed]:: 用户名只支持: 字母开头，允许数字、下划线，不区分大小写，长度：5-20位`
      );
    }
    this.username = user.username;
    this.email = user.email;
    this.mobile = user.mobile;
    this.password = user.password;
    // this.roles = Array.prototype.concat(user.roles);
    // this.avatar = user.avatar
    // "/uploads/avatars/" + avatars[(Math.random() * avatars.length) | 0];
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
