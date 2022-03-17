import { Controller, Body, Get, Post, Query, Param } from "@nestjs/common";

import { Resp } from "@/common/interfaces/Resp";
import { TransformIntQuery } from "@/common/transform/query.transform";
import { BizTypeService } from "@/biz-type/biz-type.service";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";
import { BizType } from "@/biz-type/schemas/biz-type.shema";

@Controller("biz-type")
export class BizTypeController {
  constructor(private readonly bizTypeService: BizTypeService) {}

  @Post()
  async create(@Body() body: CreateBizTypeDto): Promise<Resp<BizType>> {
    const data = await this.bizTypeService.create(body);
    return {
      code: 0,
      data,
    };
  }

  @Get()
  async findAll(
    @Query(new TransformIntQuery()) query
  ): Promise<Resp<BizType[]>> {
    const [data, total] = await this.bizTypeService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }

  @Get(':id')
  async findById(@Param('id') id): Promise<Resp<BizType>> {
    const data = await this.bizTypeService.findById(id)
    return {
      code: 0,
      data
    }
  }
}
