import type { Document } from "mongoose";
import {
  NoticeType,
  NoticeEventStatus,
  NotificationSubType,
} from "../dto/notice.dto";

import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/schemas/user.schema";
import { NoticeDto } from "../dto/notice.dto";

@Schema({
  timestamps: true,
})
export class Notice {
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  title: string;

  @Prop({
    type: Number,
    require: true,
  })
  type: NoticeType; // 通知类型

  @Prop({
    type: Number,
  })
  subType: NotificationSubType; // 通知子类型

  @Prop({
    type: Boolean,
    default: false,
  })
  read: boolean; // 是否已读

  @Prop({
    type: String,
  })
  desc?: string;

  @Prop({
    type: Number,
    require: true,
  })
  status: NoticeEventStatus; // 事件状态

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  sender: Types.ObjectId; // 发送方

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  receiver: Types.ObjectId; // 接收方

  constructor(notice: NoticeDto) {
    this.title = notice.title;
    this.type = notice.type;
    this.read = false;
    this.desc = notice.desc;
    switch (notice.type) {
      case NoticeType.Notification:
        this.subType = notice.subType;
        break;
      case NoticeType.Message:
        this.sender = notice.sender;
        this.receiver = notice.receiver;
        break;
      case NoticeType.Event:
        this.status = notice.status;
        break;
    }
  }
}

export type NoticeDocument = Notice & Document;
export const NoticeSchema = SchemaFactory.createForClass(Notice);
