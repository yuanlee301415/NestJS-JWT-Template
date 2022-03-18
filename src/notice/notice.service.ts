import type { Model } from "mongoose";
import type { PageQuery } from "@/interfaces/PageQuery";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Notice, NoticeDocument } from "./schemas/notice.schema";
import { NoticeDto } from "./dto/notice.dto";

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) readonly noticeModel: Model<NoticeDocument>
  ) {}

  async create(body: NoticeDto): Promise<Notice> {
    return this.noticeModel.create(new Notice(body));
  }

  async findAll({ current, pageSize }: PageQuery): Promise<[Notice[], number]> {
    return Promise.all([
      this.noticeModel
        .find()
        .populate({
          path: "sender",
          select: "username avatar",
        })
        .populate({
          path: "receiver",
          select: "username avatar",
        })
        .sort({ createdAt: -1, title: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.noticeModel.countDocuments(),
    ]);
  }

  async findById(id: string): Promise<Notice> {
    return this.noticeModel
      .findById(id)
      .populate({
        path: "sender",
        select: "username avatar",
      })
      .populate({
        path: "receiver",
        select: "username avatar",
      });
  }

  // Todo: 使用 userId 查询
  async getUnread(): Promise<number> {
    return this.noticeModel
      .where({
        // receiver: userId,
        read: false,
      })
      .countDocuments();
  }

  async read(id: string): Promise<Notice> {
    return this.noticeModel.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }
}
