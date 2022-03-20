import type { Model } from "mongoose";
import type { PageQuery } from "@/interfaces/PageQuery";
import type { CitTreeData, CitTreeItem } from "@/cit/types";

import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Cit, CitDocument } from "@/cit/schemas/cit.schema";
import { CreateCitDto } from "@/cit/dto/create-cit.dto";
import { UpdateCitDto } from "@/cit/dto/update-cit.dto";

@Injectable()
export class CitService {
  constructor(
    @InjectModel(Cit.name) private readonly citModel: Model<CitDocument>
  ) {}

  async create(body: CreateCitDto): Promise<Cit> {
    const parent = await this.findByName(body.parentName);
    if (!parent) {
      throw new BadRequestException(
        `cit name: ${body.name}'s parentName: ${body.parentName} is not found.`
      );
    }
    return this.citModel.create(
      new Cit({
        ...body,
        path: parent.path + "." + body.name,
      })
    );
  }

  async findAll({ current, pageSize }: PageQuery): Promise<[Cit[], number]> {
    return Promise.all([
      this.citModel
        .find()
        .populate({
          path: "bizTypes",
          select: "name displayName",
        })
        .sort({ name: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.citModel.countDocuments(),
    ]);
  }

  async findByName(name: string): Promise<Cit> {
    return this.citModel.findOne({ name });
  }

  async updateByName(name: string, body: UpdateCitDto): Promise<Cit> {
    return this.citModel.findOneAndUpdate(
      { name },
      {
        displayName: body.displayName,
        bizTypes: body.bizTypes,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  async deleteByName(name: string): Promise<void> {
    const child = await this.citModel.findOne({ parentName: name });
    if (child) {
      throw new BadRequestException(`请先删除 ${name} 的子节点`);
    }
    this.citModel.deleteOne({ name });
  }

  async getTree(): Promise<CitTreeData> {
    const docs = await this.citModel.find().sort({ path: 1 });
    const items: CitTreeData =
      (docs &&
        docs.map(
          (_) =>
            ({
              name: _.name,
              displayName: _.displayName,
              path: _.path,
              parentName: _.parentName,
              children: [],
            } as CitTreeItem)
        )) ||
      [];
    const data: CitTreeData = [];
    const parentMap: Map<string, CitTreeItem> = new Map();

    items.forEach((_) => {
      parentMap.set(_.name, _);
    });

    items.forEach((_) => {
      const parent = parentMap.get(_.parentName);
      if (parent) {
        parent.children.push(_);
      } else {
        data.push(_);
      }
    });

    return data;
  }
}
