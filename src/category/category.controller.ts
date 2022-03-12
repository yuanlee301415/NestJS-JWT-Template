import { Controller, Get, Query } from "@nestjs/common";

import { Resp } from "../common/interfaces/Resp";
import { CategoryDto } from "./dto/category.dto";
import { CategoryService } from "./category.service";
import { TransformIntQuery } from "../common/transform/query.transform";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryServer: CategoryService) {}

  @Get()
  async getAll(
    @Query(new TransformIntQuery()) query
  ): Promise<Resp<CategoryDto[]>> {
    const [data, total] = await this.categoryServer.findAllCategory(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }
}
