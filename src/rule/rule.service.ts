import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { PageQuery } from "@/common/interfaces/PageQuery";
import { RuleStatus } from "@/common/interfaces/Rule";
import { Rule, RuleDocument } from "./schemas/rule.schema";
import { CreateRuleDto } from "./dto/create-rule.dto";
import { UpdateRuleDto } from "./dto/update-rule.dto";

@Injectable()
export class RuleService {
  constructor(
    @InjectModel(Rule.name) private readonly ruleModel: Model<RuleDocument>
  ) {}
  async create(body: CreateRuleDto): Promise<Rule> {
    return this.ruleModel.create(new Rule(body as Rule));
  }

  async findAll({ current, pageSize }: PageQuery): Promise<[Rule[], number]> {
    return Promise.all([
      this.ruleModel
        .find()
        .populate({
          path: "createdBy",
          select: "username avatar",
        })
        .sort({ createdAt: -1, name: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.ruleModel.countDocuments(),
    ]);
  }

  async findById(id: string): Promise<Rule> {
    return this.ruleModel.findById(id).populate({
      path: "createdBy",
      select: "username avatar",
    });
  }

  async updateOne(id: string, body: UpdateRuleDto): Promise<Rule> {
    return this.ruleModel.findByIdAndUpdate(
      id,
      { ...new Rule(body), status: RuleStatus.Success },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async call(id: string): Promise<Rule> {
    return this.ruleModel.findByIdAndUpdate(
      id,
      {
        $inc: { callNo: 1 },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async deleteOne(id: string): Promise<Rule> {
    return this.ruleModel.findByIdAndRemove(id);
  }
}
