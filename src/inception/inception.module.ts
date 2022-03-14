import { Module } from "@nestjs/common";
import { UserModule } from "@/user/user.module";

import { InceptionService } from "./inception.service";
import { RuleModule } from "@/rule/rule.module";
import { TaskModule } from "@/task/task.module";
import { NoticeModule } from "@/notice/notice.module";

@Module({
  imports: [UserModule, RuleModule, TaskModule, NoticeModule],
  providers: [InceptionService],
  exports: [InceptionService],
})
export class InceptionModule {}
