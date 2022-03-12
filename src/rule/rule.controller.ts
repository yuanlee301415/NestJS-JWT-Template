import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { TransformIntQuery } from "../common/transform/query.transform";
import { Resp } from "../common/interfaces/Resp";
import { RuleService } from "./rule.service";
import { CreateRuleDto } from "./dto/create-rule.dto";
import { UpdateRuleDto } from "./dto/update-rule.dto";
import { Rule } from "./schemas/rule.schema";

@Controller("rules")
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post()
  async create(@Body() createRuleDto: CreateRuleDto): Promise<Resp<Rule>> {
    const data = await this.ruleService.create(createRuleDto);
    return {
      code: 0,
      data,
    };
  }

  @Get()
  async findAll(@Query(new TransformIntQuery()) query): Promise<Resp<Rule[]>> {
    const [data, total] = await this.ruleService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Resp<Rule>> {
    const data = await this.ruleService.findById(id);
    return {
      code: 0,
      data,
    };
  }

  @Put(":id")
  async updateOne(
    @Param("id") id: string,
    @Body() updateRuleDto: UpdateRuleDto
  ): Promise<Resp<Rule>> {
    const data = await this.ruleService.updateOne(id, new Rule(updateRuleDto));
    return {
      code: 0,
      data,
    };
  }

  @Put("/call/:id")
  async call(@Param("id") id: string): Promise<Resp<Rule>> {
    const data = await this.ruleService.call(id);
    return {
      code: 0,
      data,
    };
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: string): Promise<Resp<Rule>> {
    const data = await this.ruleService.deleteOne(id);
    return {
      code: 0,
      data,
    };
  }
}
