import { Module } from "@nestjs/common";
import { UserModule } from "@/user/user.module";

import { InceptionService } from "./inception.service";
import { RuleModule } from "@/rule/rule.module";
import { TaskModule } from "@/task/task.module";
import { NoticeModule } from "@/notice/notice.module";
import { BizTypeModule } from "@/biz-type/biz-type.module";

@Module({
  imports: [UserModule, RuleModule, TaskModule, NoticeModule, BizTypeModule],
  providers: [InceptionService],
  exports: [InceptionService],
})
export class InceptionModule {}
