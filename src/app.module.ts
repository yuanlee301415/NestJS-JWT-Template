import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { LoggingInterceptor } from "./common/interceptors/logger.interceptor";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { CommonModule } from "./common/common.module";
import { RightsModule } from "./rights/rights.module";
import { TaskModule } from "./task/task.module";
import { RuleModule } from "./rule/rule.module";
import { InceptionModule } from "./inception/inception.module";
import { NoticeModule } from "./notice/notice.module";
import { CitModule } from "./cit/cit.module";
import { BizTypeModule } from "./biz-type/biz-type.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [".env.local", ".env"] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("MONGODB_URL"),
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
    UserModule,
    RightsModule,
    TaskModule,
    RuleModule,
    InceptionModule,
    NoticeModule,
    CitModule,
    BizTypeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
