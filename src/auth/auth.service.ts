import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "@/user/user.service";
import { User } from "@/user/schemas/user.schema";
import { CryptoUtil } from "@/common/utils/crypto.util";
import { AuthPayload } from "@/interfaces/AuthPayload";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CryptoUtil) readonly cryptoUtil: CryptoUtil
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    console.log("AuthService>validateUser>user:", user);
    if (user && this.cryptoUtil.checkPassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<string> {
    // console.log("AuthService>login>user:", user);
    const payload: AuthPayload = {
      avatar: user.avatar,
      username: user.username,
      sub: String(user._id),
    };
    // console.log("AuthService>login>payload:", payload);
    return this.jwtService.sign(payload);
  }
}
