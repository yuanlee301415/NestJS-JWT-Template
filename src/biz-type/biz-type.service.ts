import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { BizType, BizTypeDocument } from "@/biz-type/schemas/biz-type.shema";
import { CreateBizTypeDto } from "@/biz-type/dto/create-biz-type.dto";

@Injectable()
export class BizTypeService {
    constructor(
        @InjectModel(BizType.name) private readonly bizTypeModel: Model<BizTypeDocument>
    ) {}

    async create(createBizTypeDto: CreateBizTypeDto): Promise<BizType> {
        return this.bizTypeModel.create(new BizType())
    }

    async findAll(): Promise<BizType[]>{
        return this.bizTypeModel.find().sort({ createdAt: -1, name: 1})
    }
}
