import type { Model } from "mongoose";
import type { PageQuery } from "@/interfaces/PageQuery";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { TaskDto } from "./dto/task.dto";
import { Task, TaskDocument } from "./schemas/task.schema";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>
  ) {}
  async create(body: TaskDto): Promise<Task> {
    return this.taskModel.create(new Task(body));
  }

  async findAll({
    current,
    pageSize,
    keyword,
  }: PageQuery): Promise<[Task[], number]> {
    const query = {
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    };
    return Promise.all([
      this.taskModel
        .find(query)
        .populate({
          path: "owner",
          select: "username avatar",
        })
        .populate({
          path: "createdBy",
          select: "username avatar",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.taskModel.countDocuments(query),
    ]);
  }

  async findById(id: string): Promise<Task> {
    return this.taskModel
      .findById(id)
      .populate({
        path: "owner",
        select: "username avatar",
      })
      .populate({
        path: "createdBy",
        select: "username avatar",
      });
  }

  async updateOne(id: string, body: TaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, new Task(body), {
      new: true,
      useFindAndModify: false,
    });
  }

  async deleteOne(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(id);
  }
}
