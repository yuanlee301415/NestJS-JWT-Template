import type { Model } from "mongoose";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PageQuery } from "../common/interfaces/PageQuery";
import { ProjectDto } from "./dto/project.dto";
import { Project, ProjectDocument } from "./schemas/project.schema";

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>
  ) {}

  async insertMany(projects: ProjectDto[]): Promise<Project[]> {
    return this.projectModel.insertMany(projects.map((_) => new Project(_)));
  }

  async findAll({
    current,
    pageSize,
  }: PageQuery): Promise<[Project[], number]> {
    return Promise.all([
      this.projectModel
        .find()
        .populate({
          path: "members",
          select: "username avatar",
        })
        .populate({
          path: "createdBy",
          select: "username avatar",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.projectModel.countDocuments(),
    ]);
  }
}
