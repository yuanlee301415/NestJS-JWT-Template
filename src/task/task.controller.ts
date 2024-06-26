import type { Resp } from "@/interfaces/Resp";

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Req,
  Body,
} from "@nestjs/common";

import { TransformIntQuery } from "@/common/transform/query.transform";

import { TaskDto } from "./dto/task.dto";
import { TaskService } from "./task.service";
import { Task } from "./schemas/task.schema";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Req() req, @Body() body: TaskDto): Promise<Resp<Task>> {
    const data = await this.taskService.create(body);
    return {
      code: 0,
      data,
    };
  }

  @Get()
  async findAll(
    @Query(new TransformIntQuery(["keyword"])) query
  ): Promise<Resp<Task[]>> {
    const [data, total] = await this.taskService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Resp<Task>> {
    const data = await this.taskService.findById(id);
    return {
      code: 0,
      data,
    };
  }

  @Put(":id")
  async updateOne(
    @Param("id") id: string,
    @Body() body: TaskDto
  ): Promise<Resp<Task>> {
    const data = await this.taskService.updateOne(id, body);
    return {
      code: 0,
      data,
    };
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: string): Promise<Resp<Task>> {
    const data = await this.taskService.deleteOne(id);
    return {
      code: 0,
      data,
    };
  }
}
