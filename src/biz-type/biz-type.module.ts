import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { BizType, BizTypeSchema } from "@/biz-type/schemas/biz-type.shema";
import { BizTypeController } from "@/biz-type/biz-type.controller";
import { BizTypeService } from "@/biz-type/biz-type.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: BizType.name, schema: BizTypeSchema }])
    ],
    controllers: [BizTypeController],
    providers: [BizTypeService],
    exports: [BizTypeService]
})
export class BizTypeModule {}