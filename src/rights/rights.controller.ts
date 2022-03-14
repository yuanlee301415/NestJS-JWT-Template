import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { LocalAuthGuard } from "@/auth/guards/local-auth.guard";
import { Resp } from "@/common/interfaces/Resp";
import { Token } from "@/common/interfaces/Token";
import { RightsService } from "./rights.service";
import { AuthService } from "@/auth/auth.service";
import { NoticeService } from "@/notice/notice.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AuthUser } from "@/common/interfaces/AuthUser";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { User } from "@/user/schemas/user.schema";

@Controller("rights")
export class RightsController {
  constructor(
    private readonly authService: AuthService,
    private readonly rightsService: RightsService,
    private readonly noticeService: NoticeService
  ) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<Resp<User>> {
    console.log(
      "RightsController>register>user>createUserDto:\n",
      createUserDto
    );
    const data = await this.rightsService.register(createUserDto);
    console.log("RightsController>register>data:\n", data);

    return {
      code: 0,
      data,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Req() req,
    @Body() body: { username: string; password: string; type: string }
  ): Promise<Resp<Token>> {
    console.log("RightsController>login>req.user:", req.user);
    console.log("RightsController>login>body:", body);
    if (!req.user.roles || !req.user.roles.includes(body.type))
      throw new UnauthorizedException(); // 无权限

    return {
      code: 0,
      data: {
        access_token: await this.authService.login(req.user),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("authUser")
  getAuthUser(@Req() req): Resp<AuthUser> {
    console.log("RightsController>getAuthUser>req.user:", req.user);
    return {
      code: 0,
      data: {
        ...req.user,
        unreadCount: 11,
      },
    };
  }

  // Todo: 临时方案，最终使用 getAuthUser 代替
  @Get("currentUser")
  async currentUser(): Promise<Resp<AuthUser>> {
    const user = await this.rightsService.getCurrentUser("admin");
    const unreadCount = await this.noticeService.getUnread();
    return {
      code: 0,
      data: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        unreadCount,
      },
    };
  }
}
