import { Injectable, OnModuleInit } from "@nestjs/common";

import { InceptionService } from "./inception/inception.service";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly inceptionService: InceptionService) {}

  async onModuleInit() {
    await this.inceptionService.main();
  }

  getHello(): string {
    return `Hello: [${process.env.NAME}]! - ${new Date().toLocaleString()}`;
  }
}
