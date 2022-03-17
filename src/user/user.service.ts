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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
    const ret = await this.userModel.create({
      ...newUser,
      roles: [RoleEnum.Web], // 默认为：前台角色
      password: this.cryptoUtil.encryptPassword(createUserDto.password),
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
