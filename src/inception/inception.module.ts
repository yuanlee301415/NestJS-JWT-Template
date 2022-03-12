import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";

import { InceptionService } from "./inception.service";
import { ProfileModule } from "../profile/profile.module";
import { ArticleModule } from "../article/article.module";
import { CategoryModule } from "../category/category.module";
import { ProjectModule } from "../project/project.module";
import { ApplicationModule } from "../application/application.module";
import { RuleModule } from "../rule/rule.module";
import { TaskModule } from "../task/task.module";
import { NoticeModule } from "../notice/notice.module";

@Module({
  imports: [
    UserModule,
    ProfileModule,
    ArticleModule,
    CategoryModule,
    ProjectModule,
    ApplicationModule,
    RuleModule,
    TaskModule,
    NoticeModule,
  ],
  providers: [InceptionService],
  exports: [InceptionService],
})
export class InceptionModule {}
