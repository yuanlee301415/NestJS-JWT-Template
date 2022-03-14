import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Rule, RuleSchema } from "./schemas/rule.schema";
import { RuleController } from "./rule.controller";
import { RuleService } from "./rule.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
  ],
  controllers: [RuleController],
  providers: [RuleService],
  exports: [RuleService],
})
export class RuleModule {}
