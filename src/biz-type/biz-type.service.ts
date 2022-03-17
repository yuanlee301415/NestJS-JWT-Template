import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { PageQuery } from "@/common/interfaces/PageQuery";
import { BizType, BizTypeDocument } from "@/biz-type/schemas/biz-type.shema";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";

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
        .populate({
          path: "createdBy",
          select: "username avatar",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.bizTypeModel.countDocuments(),
    ]);
  }
}
