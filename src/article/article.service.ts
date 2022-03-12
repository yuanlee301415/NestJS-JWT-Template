import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Article, ArticleDocument } from "./schemas/article.schema";
import { ArticleDto } from "./dto/article.dto";
import { PageQuery } from "../common/interfaces/PageQuery";

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>
  ) {}

  async insertManyArticle(articles: ArticleDto[]): Promise<Article[]> {
    return this.articleModel.insertMany(articles.map((_) => new Article(_)));
  }

  async findAllArticle({
    current,
    pageSize,
  }: PageQuery): Promise<[Article[], number]> {
    return Promise.all([
      this.articleModel
        .find()
        .populate({
          path: "categories",
          select: "title",
        })
        .populate({
          path: "createdBy",
          select: "username avatar",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.articleModel.countDocuments(),
    ]);
  }
}
