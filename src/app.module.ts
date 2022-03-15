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
import { ResourceModelService } from './resource-model/resource-model.service';
import { ResourceModelController } from './resource-model/resource-model.controller';
import { ResourceModelModule } from './resource-model/resource-model.module';
import { BizTypeService } from './biz-type/biz-type.service';
import { BizTypeController } from './biz-type/biz-type.controller';
import { BizTypeModule } from './biz-type/biz-type.module';

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
    ResourceModelModule,
    BizTypeModule,
  ],
  controllers: [AppController, ResourceModelController, BizTypeController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
    ResourceModelService,
    BizTypeService,
  ],
})
export class AppModule {}
