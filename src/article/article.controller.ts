import { Controller, Get, Query } from "@nestjs/common";

import { Resp } from "../common/interfaces/Resp";
import { ArticleDto } from "./dto/article.dto";
import { ArticleService } from "./article.service";
import { TransformIntQuery } from "../common/transform/query.transform";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Todo: 支持 owner / 活跃用户 / 好评度 查询
  @Get()
  async getAll(
    @Query(new TransformIntQuery()) query
  ): Promise<Resp<ArticleDto[]>> {
    const [data, total] = await this.articleService.findAllArticle(query);
    return {
      code: 0,
      data,
      total,
      current: query.current,
      pageSize: query.pageSize,
    };
  }
}
