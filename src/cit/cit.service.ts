import type { Model } from "mongoose";
import type { PageQuery } from "@/interfaces/PageQuery";

import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Cit, CitDocument } from "@/cit/schemas/cit.schema";
import { CreateCitDto } from "@/cit/dto/create-cit.dto";

@Injectable()
export class CitService {
  constructor(
    @InjectModel(Cit.name) private readonly citModel: Model<CitDocument>
  ) {}

  async create(body: CreateCitDto): Promise<Cit> {
    const parent = await this.findByName(body.parentName)
    if (!parent) {
      throw new BadRequestException(`cit name: ${body.name}'s parentName: ${body.parentName} is not found.`)
    }
    return this.citModel.create(new Cit({
      ...body,
      path: parent.path + '.' + body.name
    }));
  }

  async findAll({ current, pageSize }: PageQuery): Promise<[Cit[], number]> {
    return Promise.all([
      this.citModel
        .find()
        .populate({
          path: "bizTypes",
          select: "name displayName",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.citModel.countDocuments(),
    ]);
  }

  async findByName(name: string) {
    return this.citModel.findOne({ name })
  }
}
