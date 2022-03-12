import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Goods, GoodsSchema } from "./schemas/goods.schema";
import { Progress, ProgressSchema } from "./schemas/progress.schema";
import {
  OperationLog,
  OperationLogSchema,
} from "./schemas/operation-log.schema";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Goods.name, schema: GoodsSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: OperationLog.name, schema: OperationLogSchema },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
