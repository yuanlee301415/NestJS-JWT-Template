import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "@/user/dto/create-user.dto";
import { User } from "@/user/schemas/user.schema";
import { UserService } from "@/user/user.service";

@Injectable()
export class RightsService {
  constructor(private readonly userServer: UserService) {}

  async register(body: CreateUserDto): Promise<User> {
    return await this.userServer.create(body);
  }

  // Todo: 未登录时的临时方案，最终使用 getAuthUser 代替
  async getCurrentUser(username: string): Promise<User> {
    return await this.userServer.findByUsername(username);
  }
}
