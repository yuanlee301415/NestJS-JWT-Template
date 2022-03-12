import { Controller, Get } from "@nestjs/common";
import { Resp } from "../common/interfaces/Resp";

import { ProfileService } from "./profile.service";
import { GoodsDto } from "./dto/goods.dto";
import { ProgressDto } from "./dto/progress.dto";
import { OperationLogDto } from "./dto/operation-log.dto";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("basic")
  async getAllBasic(): Promise<
    Resp<{
      basicGoods: GoodsDto[];
      basicProgress: ProgressDto[];
    }>
  > {
    const [[basicGoods], [basicProgress]] = await Promise.all([
      this.profileService.findAllGoods({ current: 1, pageSize: 100 }),
      this.profileService.findAllProgress({ current: 1, pageSize: 100 }),
    ]);
    return {
      code: 0,
      data: {
        basicGoods,
        basicProgress,
      },
    };
  }

  @Get("advanced")
  async getAllAdvanced(): Promise<
    Resp<{
      advancedOperation1: OperationLogDto[];
      advancedOperation2: OperationLogDto[];
      advancedOperation3: OperationLogDto[];
    }>
  > {
    const [logs, total] = await this.profileService.findAllOperationLog({
      current: 1,
      pageSize: 100,
    });
    const half = (total / 2) | 0;
    return {
      code: 0,
      data: {
        advancedOperation1: logs.slice(0, half),
        advancedOperation2: logs.slice(half, -2),
        advancedOperation3: logs.slice(-2),
      },
    };
  }
}
