import type { Resp } from "@/interfaces/Resp";

import {
  Controller,
  Get,
  Query,
  Param,
  Req,
  UseGuards,
  Delete,
} from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "./schemas/user.schema";
import { TransformIntQuery } from "@/common/transform/query.transform";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query(new TransformIntQuery()) query): Promise<Resp<User[]>> {
    console.log("UserController>findAll>query:\n", query);
    const [data, total] = await this.userService.findAll(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Resp<User>> {
    console.log("UserController>findById>id:\n", id);
    const data = await this.userService.findById(id);
    return {
      code: 0,
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteOne(@Req() req, @Param("id") id: string): Promise<Resp<User>> {
    const data = await this.userService.deleteOne(id);
    return {
      code: 0,
      data,
    };
  }
}
