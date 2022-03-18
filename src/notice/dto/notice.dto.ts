import { Types } from "mongoose";

import {
  Length,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsBoolean,
  IsString,
} from "class-validator";

import { NotBlank } from "@/common/validator/NotBlank";
import {
  NoticeType,
  NoticeEventStatus,
  NotificationSubType,
} from "@/interfaces/Notice";

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
  readonly sender: Types.ObjectId; // 发送方

  @IsOptional()
  @IsMongoId()
  readonly receiver: Types.ObjectId; // 接收方
}
