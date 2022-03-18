import type { PageQuery } from "@/interfaces/PageQuery";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { BizType, BizTypeDocument } from "@/biz-type/schemas/biz-type.shema";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";
import { UpdateBizTypeDto } from "@/biz-type/dto/update-biz-type.dto";

@Injectable()
export class BizTypeService {
  constructor(
    @InjectModel(BizType.name)
    private readonly bizTypeModel: Model<BizTypeDocument>
  ) {}

  async create(body: CreateBizTypeDto): Promise<BizType> {
    return this.bizTypeModel.create(new BizType(body));
  }

  async findAll({
    current,
    pageSize,
  }: PageQuery): Promise<[BizType[], number]> {
    return Promise.all([
      this.bizTypeModel
        .find()
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.bizTypeModel.countDocuments(),
    ]);
  }

  async findById(id: string): Promise<BizType> {
    return this.bizTypeModel.findById(id);
  }

  async updateById(id: string, body: UpdateBizTypeDto): Promise<BizType> {
    return this.bizTypeModel.findByIdAndUpdate(
      id,
      {
        displayName: body.displayName,
        desc: body.desc,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async removeById(id: string): Promise<BizType> {
    return this.bizTypeModel.findByIdAndRemove(id);
  }
}
