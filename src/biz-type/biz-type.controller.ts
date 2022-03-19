import type { Resp } from "@/interfaces/Resp";

import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Query,
  Param,
  Delete,
} from "@nestjs/common";

import { TransformIntQuery } from "@/common/transform/query.transform";
import { BizTypeService } from "@/biz-type/biz-type.service";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";
import { BizType } from "@/biz-type/schemas/biz-type.shema";
import { UpdateBizTypeDto } from "@/biz-type/dto/update-biz-type.dto";

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

  @Get(":name")
  async findByName(@Param("name") name): Promise<Resp<BizType>> {
    const data = await this.bizTypeService.findByName(name);
    return {
      code: 0,
      data,
    };
  }

  @Put(":name")
  async updateByName(
    @Param("name") name: string,
    @Body() body: UpdateBizTypeDto
  ): Promise<Resp<BizType>> {
    const data = await this.bizTypeService.updateByName(name, body);
    return {
      code: 0,
      data,
    };
  }

  @Delete()
  async deleteMany(@Body() body: { ids: string[] }): Promise<Resp<any>> {
    await this.bizTypeService.deleteMany(body.ids);
    return {
      code: 0,
    };
  }
}
