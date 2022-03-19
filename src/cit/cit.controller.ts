import type { Resp } from "@/interfaces/Resp";

import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { TransformIntQuery } from "@/common/transform/query.transform";
import { CitService } from "@/cit/cit.service";
import { Cit } from "@/cit/schemas/cit.schema";
import { CreateCitDto } from "@/cit/dto/create-cit.dto";

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
}
