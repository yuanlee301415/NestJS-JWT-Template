import { Controller, Get, Query } from "@nestjs/common";

import { TransformIntQuery } from "../common/transform/query.transform";
import { Resp } from "../common/interfaces/Resp";
import { ApplicationDto } from "./dto/application.dto";
import { ApplicationService } from "./application.service";

@Controller("applications")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async getAll(
    @Query(new TransformIntQuery()) query
  ): Promise<Resp<ApplicationDto[]>> {
    const [data, total] = await this.applicationService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }
}
