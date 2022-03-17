import {
  Controller,
  Get,
  Patch,
  Query,
  Param,
  Post,
  Body,
} from "@nestjs/common";

import { TransformIntQuery } from "@/common/transform/query.transform";
import { Resp } from "@/common/interfaces/Resp";
import { Notice } from "./schemas/notice.schema";
import { NoticeService } from "./notice.service";
import { NoticeDto } from "./dto/notice.dto";

@Controller("notices")
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  async create(@Body() body: NoticeDto): Promise<Resp<Notice>> {
    const data = await this.noticeService.create(body);
    return {
      code: 0,
      data,
    };
  }

  @Get()
  async getAll(@Query(new TransformIntQuery()) query): Promise<Resp<Notice[]>> {
    const [data, total] = await this.noticeService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<Resp<Notice>> {
    const data = await this.noticeService.findById(id);
    return {
      code: 0,
      data,
    };
  }

  @Patch("read/:id")
  async read(@Param("id") id: string): Promise<Resp<Notice>> {
    const data = await this.noticeService.read(id);
    return {
      code: 0,
      data,
    };
  }
}
