import type { Document } from "mongoose";

import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CreateRuleDto } from "../dto/create-rule.dto";
import { UpdateRuleDto } from "../dto/update-rule.dto";
import { User } from "../../user/schemas/user.schema";

// 规则状态
export enum RuleStatus {
  Default, // 关闭
  Processing, // 进行中
  Success, // 已上线
  Error, // 异常
}

@Schema({
  timestamps: true,
})
export class Rule {
  @Prop({
    type: String,
    index: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  desc: string;

  @Prop({
    type: String,
  })
  target: string;

  @Prop({
    type: String,
  })
  template: string;

  @Prop({
    type: Number,
  })
  type: number;

  @Prop({
    type: Date,
  })
  startTime: Date;

  @Prop({
    type: String,
  })
  frequency: string;

  @Prop({
    type: Number,
    default: 1,
  })
  callNo: number;

  @Prop({
    type: Number,
    default: 0,
  })
  status: RuleStatus;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  createdBy: Types.ObjectId;

  constructor(rule: CreateRuleDto & UpdateRuleDto) {
    this.name = rule.name;
    this.desc = rule.desc;
    this.target = rule.target;
    this.template = rule.template;
    this.type = rule.type;
    this.startTime = rule.startTime;
    this.frequency = rule.frequency;
    this.createdBy = rule.createdBy;
    // console.log("new Rule:", this);
  }
}

export type RuleDocument = Rule & Document;
export const RuleSchema = SchemaFactory.createForClass(Rule);
