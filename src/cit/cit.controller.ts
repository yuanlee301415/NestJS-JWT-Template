import type { Resp } from "@/interfaces/Resp";
import type { CitTreeData } from "@/cit/types";

import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from "@nestjs/common";

import { TransformIntQuery } from "@/common/transform/query.transform";
import { CitService } from "@/cit/cit.service";
import { Cit } from "@/cit/schemas/cit.schema";
import { CreateCitDto } from "@/cit/dto/create-cit.dto";
import { UpdateCitDto } from "@/cit/dto/update-cit.dto";

@Controller("cit")
export class CitController {
  constructor(private readonly citService: CitService) {}

  @Post()
  async create(@Body() body: CreateCitDto): Promise<Resp<Cit>> {
    return {
      code: 0,
      data: await this.citService.create(body),
    };
  }

  @Get()
  async findAll(@Query(new TransformIntQuery()) query): Promise<Resp<Cit[]>> {
    const [data, total] = await this.citService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }

  @Get("__tree__")
  async getTree(): Promise<Resp<CitTreeData>> {
    const data = await this.citService.getTree();
    return {
      code: 0,
      data,
    };
  }

  @Get(":name")
  async findByName(@Param("name") name: string): Promise<Resp<Cit>> {
    const data = await this.citService.findByName(name);
    return {
      code: 0,
      data,
    };
  }

  @Put(":name")
  async updateByName(
    @Param("name") name: string,
    @Body() body: UpdateCitDto
  ): Promise<Resp<Cit>> {
    const data = await this.citService.updateByName(name, body);
    return {
      code: 0,
      data,
    };
  }

  @Delete(":name")
  async deleteByName(@Param("name") name: string): Promise<Resp<void>> {
    await this.citService.deleteByName(name);
    return {
      code: 0,
    };
  }
}
