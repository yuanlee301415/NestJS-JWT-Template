import { Module } from "@nestjs/common";
import { RightsController } from "./rights.controller";
import { RightsService } from "./rights.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { NoticeModule } from "../notice/notice.module";

@Module({
  controllers: [RightsController],
  imports: [AuthModule, UserModule, NoticeModule],
  providers: [RightsService],
})
export class RightsModule {}
