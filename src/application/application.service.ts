import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { PageQuery } from "../common/interfaces/PageQuery";
import { Application, ApplicationDocument } from "./schemas/application.schema";
import { ApplicationDto } from "./dto/application.dto";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>
  ) {}

  async insertMany(applications: ApplicationDto[]): Promise<Application[]> {
    return this.applicationModel.insertMany(
      applications.map((_) => new Application(_))
    );
  }

  async findAll({
    current,
    pageSize,
  }: PageQuery): Promise<[Application[], number]> {
    return Promise.all([
      this.applicationModel
        .find()
        .populate({
          path: "createdBy",
          select: "username avatar",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.applicationModel.countDocuments(),
    ]);
  }
}
