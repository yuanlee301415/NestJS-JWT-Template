import * as mongoose from "mongoose";
import {
  Length,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsBoolean,
  IsString,
} from "class-validator";

import { NotBlank } from "../../common/validator/NotBlank";

// 通知类型
export enum NoticeType {
  Notification, // 通知
  Message, // 消息
  Event, // 事件
}

// Notification 类型(仅用于前端使用不同图标显示，无实际意义)
export enum NotificationSubType {
  Work,
  Your,
  Template,
  Icon,
}

// 事件状态
export enum NoticeEventStatus {
  Todo, // 未开始
  Urgent, // 紧急的
  Doing, // 进行中
  Finished, // 已结束
}

export class NoticeDto {
  @NotBlank()
  @IsString()
  @Length(2, 50)
  readonly title: string;

  @IsEnum(NoticeType)
  readonly type: number; // 通知类型

  @IsOptional()
  @IsEnum(NotificationSubType)
  readonly subType: number; // 通知子类型

  @IsOptional()
  @IsBoolean()
  readonly read: boolean; // 是否已读

  @IsOptional()
  @IsString()
  @Length(10, 255)
  readonly desc: string;

  @IsOptional()
  @IsEnum(NoticeEventStatus)
  readonly status: number; // 事件状态

  @IsOptional()
  @IsMongoId()
  readonly sender: mongoose.Schema.Types.ObjectId; // 发送方

  @IsOptional()
  @IsMongoId()
  readonly receiver: mongoose.Schema.Types.ObjectId; // 接收方
}
