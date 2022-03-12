import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notice, NoticeSchema } from "./schemas/notice.schema";
import { NoticeController } from "./notice.controller";
import { NoticeService } from "./notice.service";

@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Notice.name,
        schema: NoticeSchema,
      },
    ]),
  ],
})
export class NoticeModule {}
