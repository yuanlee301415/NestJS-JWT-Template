import { Controller, Body, Get, Post } from '@nestjs/common';

import { Resp } from "@/common/interfaces/Resp";
import { BizTypeService } from "@/biz-type/biz-type.service";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";
import { BizType } from "@/biz-type/schemas/biz-type.shema";

@Controller('biz-type')
export class BizTypeController {
    constructor(private readonly bizTypeService: BizTypeService) {}

    @Post()
    async create(@Body() body: CreateBizTypeDto): Promise<Resp<BizType>> {
        const data = await this.bizTypeService.create(body)
        return {
            code: 0,
            data
        }
    }
}
