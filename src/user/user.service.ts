import type { Model } from "mongoose";

import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { CryptoUtil } from "@/common/utils/crypto.util";
import { PageQuery } from "@/common/interfaces/PageQuery";
import RoleEnum from "@/user/role.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    if (!/^[a-z]\w{4,19}$/i.test(body.username)) {
      throw new BadRequestException(
        "用户名只支持: 字母开头，允许数字、下划线，不区分大小写，长度：5-20位"
      );
    }

    const newUser = new User(body);
    const ret = await this.userModel.create({
      ...newUser,
      roles: [RoleEnum.Web], // 默认为：前台角色
      password: this.cryptoUtil.encryptPassword(body.password),
    });

    return this.findById(ret._id);
  }

  async findAll({ current, pageSize }: PageQuery): Promise<[User[], number]> {
    return Promise.all([
      this.userModel
        .find(null, { password: 0 })
        .sort({ createdAt: -1, username: 1 })
        .skip((current - 1) * pageSize)
        .limit(pageSize),
      this.userModel.countDocuments(),
    ]);
  }

  async findById(id: string): Promise<User> {
    // console.log("UserService>findById>id:\n", id);
    return this.userModel.findById(id, { password: 0 });
  }

  async findByUsername(username: string): Promise<User> {
    // console.log("UserService>findByUsername>username:", username);
    return this.userModel.findOne({ username });
  }

  async deleteOne(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
