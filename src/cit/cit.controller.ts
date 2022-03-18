import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from "@nestjs/common";

import { Resp} from "@/common/interfaces/Resp";
import { TransformIntQuery} from "@/common/transform/query.transform";
import {CitService} from "@/cit/cit.service";
import { Cit} from "@/cit/schemas/cit.schema";
import {CreateCitDto} from "@/cit/dto/create-cit.dto";

@Controller("cit")
export class CitController {
    constructor(private readonly citService: CitService) {
    }

    @Post()
    async create(@Body() body: CreateCitDto): Promise<Resp<Cit>>{
        return {
            code: 0,
            data: await this.citService.create(body)
        }
    }
}
