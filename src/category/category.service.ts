import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Category, CategoryDocument } from "./schemas/category.schema";
import { CategoryDto } from "./dto/category.dto";
import { PageQuery } from "../common/interfaces/PageQuery";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async insertManyCategories(categories: CategoryDto[]): Promise<Category[]> {
    return this.categoryModel.insertMany(
      categories.map((_) => new Category(_))
    );
  }

  async findAllCategory({
    current,
    pageSize,
  }: PageQuery): Promise<[Category[], number]> {
    return Promise.all([
      this.categoryModel
        .find()
        .sort({ createdAt: -1, name: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.categoryModel.countDocuments(),
    ]);
  }
}
