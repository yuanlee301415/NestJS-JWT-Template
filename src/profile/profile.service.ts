import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Goods, GoodsDocument } from "./schemas/goods.schema";
import { Progress, ProgressDocument } from "./schemas/progress.schema";
import {
  OperationLog,
  OperationLogDocument,
} from "./schemas/operation-log.schema";
import { GoodsDto } from "./dto/goods.dto";
import { ProgressDto } from "./dto/progress.dto";
import { OperationLogDto } from "./dto/operation-log.dto";
import { PageQuery } from "../common/interfaces/PageQuery";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Goods.name) private readonly goodsModel: Model<GoodsDocument>,
    @InjectModel(Progress.name)
    private readonly progressModel: Model<ProgressDocument>,
    @InjectModel(OperationLog.name)
    private readonly operationLogModel: Model<OperationLogDocument>
  ) {}

  async insertManyGoods(goodsList: GoodsDto[]): Promise<Goods[]> {
    return this.goodsModel.insertMany(goodsList.map((_) => new Goods(_)));
  }

  async findAllGoods({
    current,
    pageSize,
  }: PageQuery): Promise<[Goods[], number]> {
    return Promise.all([
      this.goodsModel
        .find()
        .sort({ createdAt: -1, name: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.goodsModel.countDocuments(),
    ]);
  }

  async insertManyProgress(progressList: ProgressDto[]): Promise<Progress[]> {
    return this.progressModel.insertMany(
      progressList.map((_) => new Progress(_))
    );
  }

  async findAllProgress({
    current,
    pageSize,
  }: PageQuery): Promise<[Progress[], number]> {
    return Promise.all([
      this.progressModel
        .find()
        .populate({
          path: "operator",
          select: "username avatar",
        })
        .sort({ createdAt: -1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.progressModel.countDocuments(),
    ]);
  }

  async insertManyOperationLog(
    operationLogs: OperationLogDto[]
  ): Promise<OperationLog[]> {
    return this.operationLogModel.insertMany(
      operationLogs.map((_) => new OperationLog(_))
    );
  }

  async findAllOperationLog({
    current,
    pageSize,
  }: PageQuery): Promise<[OperationLog[], number]> {
    return Promise.all([
      this.operationLogModel
        .find()
        .populate({
          path: "operator",
          select: "username avatar",
        })
        .sort({ createdAt: -1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.operationLogModel.countDocuments(),
    ]);
  }
}
