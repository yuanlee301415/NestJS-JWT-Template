import { Controller, Get, Query } from "@nestjs/common";

import { Resp } from "../common/interfaces/Resp";
import { TransformIntQuery } from "../common/transform/query.transform";
import { ProjectDto } from "./dto/project.dto";
import { ProjectService } from "./project.service";

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAll(
    @Query(new TransformIntQuery()) query
  ): Promise<Resp<ProjectDto[]>> {
    const [data, total] = await this.projectService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }
}
