import { Module } from "@nestjs/common";
import { UserModule } from "@/user/user.module";

import { InceptionService } from "./inception.service";
import { RuleModule } from "@/rule/rule.module";
import { TaskModule } from "@/task/task.module";
import { NoticeModule } from "@/notice/notice.module";
import { BizTypeModule } from "@/biz-type/biz-type.module";
import { CitModule } from "@/cit/cit.module";

@Module({
  imports: [UserModule, RuleModule, TaskModule, NoticeModule, BizTypeModule, CitModule],
  providers: [InceptionService],
  exports: [InceptionService],
})
export class InceptionModule {}
