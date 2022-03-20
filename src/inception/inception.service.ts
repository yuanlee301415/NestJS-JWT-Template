const faker = require("faker");

import { Injectable } from "@nestjs/common";

import { User } from "@/user/schemas/user.schema";
import { UserService } from "@/user/user.service";
import { Rule } from "@/rule/schemas/rule.schema";
import { RuleService } from "@/rule/rule.service";
import { Task } from "@/task/schemas/task.schema";
import { TaskService } from "@/task/task.service";
import { BizType } from "@/biz-type/schemas/biz-type.shema";
import { BizTypeService } from "@/biz-type/biz-type.service";
import { Cit } from "@/cit/schemas/cit.schema";
import { CitService } from "@/cit/cit.service";

const TITLES = [
  "Alipay",
  "Angular",
  "Ant",
  "Bootstrap",
  "Pro",
  "React",
  "Vue",
  "Webpack",
];

@Injectable()
export class InceptionService {
  constructor(
    private readonly userService: UserService,
    private readonly ruleService: RuleService,
    private readonly taskService: TaskService,
    private readonly bizTypeService: BizTypeService,
    private readonly citService: CitService
  ) {}

  async main() {
    // 查询前置初始数据
    const [[users, userTotal], [bizTypes, bizTypeTotal]]: [
      [User[], number],
      [BizType[], number]
    ] = await Promise.all([
      this.userService.findAll({ current: 1, pageSize: 0 }),
      this.bizTypeService.findAll({ current: 1, pageSize: 0 }),
    ]);

    // 创建前置初始数据
    const preInceptions: [Promise<User[]>, Promise<BizType[]>] = [
      users.length
        ? Promise.resolve(users)
        : this.mockUser([
            "admin",
            "webUser",
            "testUser",
            "user_1",
            "user_2",
            "user_3",
          ]),
      bizTypes.length ? Promise.resolve(bizTypes) : this.mockBizType(),
    ];

    const [newUsers, newBizTypes]: [User[], BizType[]] = await Promise.all(
      preInceptions
    );
    console.log("newUsers[0]:", newUsers[0]);
    const admin = newUsers.find((_) => _.username === "admin");
    console.log("admin:\n", admin);
    console.log("newBizTypes[0]:", newBizTypes[0]);

    // 查询后置初始数据
    const [[rules, ruleTotal], [tasks, taskTotal], [cits, citTotal]]: [
      [Rule[], number],
      [Task[], number],
      [Cit[], number]
    ] = await Promise.all([
      this.ruleService.findAll({ current: 1, pageSize: 1 }),
      this.taskService.findAll({ current: 1, pageSize: 1 }),
      this.citService.findAll({ current: 1, pageSize: 1 }),
    ]);

    // 创建后置初始数据
    const postInceptions: [
      Rule[] | Promise<Rule[]>,
      Task[] | Promise<Task[]>,
      Cit[] | Promise<Cit[]>
    ] = [
      ruleTotal ? rules : this.mockRule(admin, 11),
      taskTotal ? tasks : this.mockTask(newUsers, admin, 11),
      citTotal ? cits : this.mockCit(newBizTypes),
    ];
    const [newRules, newTasks, newCits]: (Rule[] | Task[] | Cit[])[] =
      await Promise.all(postInceptions);
    console.log("newRules[0]:", newRules[0]);
    console.log("newTasks[0]:", newTasks[0]);
    console.log("newCits[0]:", newCits[0]);
    console.log(
      `---------------------------------------AppService>onModuleInit::end---------------------------------------\n\n`
    );
  }

  /* mock user */
  async mockUser(usernames: string[]): Promise<User[]> {
    return Promise.all(
      usernames.map((_, idx) =>
        this.userService.create({
          username: _,
          email: `${_}@163.com`,
          password: "123456",
          mobile: `1380000000${idx}`,
        })
      )
    );
  }

  /* mock rule data */
  async mockRule(admin, total: number = 11): Promise<Rule[]> {
    const data = Array.from({ length: total }).map((_, idx) => ({
      name: `Mock-rule-name-${idx}`,
      desc: faker.lorem.text(),
      createdBy: admin._id,
    }));
    return Promise.all(data.map((_) => this.ruleService.create(_)));
  }

  /* mock task data */
  async mockTask(users, admin, total: number = 11): Promise<Task[]> {
    const data = Array.from({ length: total }).map((_, idx) => ({
      desc: `Mock-task-desc-${idx}`,
      startTime: new Date(),
      logo:
        `/uploads/logos/` + TITLES[idx % TITLES.length].toLowerCase() + ".png",
      owner: users[(Math.random() * users.length) | 0]._id,
      // subDescription: faker.lorem.text(),
      title: `Mock-task-title-${idx}`,
      percent: 0,
      status: 0,
      createdBy: admin._id,
    }));
    return Promise.all(data.map((_) => this.taskService.create(_)));
  }

  /* mock bizType data */
  async mockBizType(): Promise<BizType[]> {
    const data = [
      {
        name: "monitor",
        displayName: "监控",
        system: true,
        desc: "监控",
      },
      {
        name: "asset",
        displayName: "资产",
        system: true,
        desc: "资产",
      },
      {
        name: "video",
        displayName: "视频",
        system: true,
        desc: "视频",
      },
      {
        name: "iot",
        displayName: "物联网",
        system: true,
        desc: "物联网",
      },
    ];
    return Promise.all(data.map((_) => this.bizTypeService.create(_)));
  }

  /* mock cit data */
  async mockCit(bizTypes: BizType[]): Promise<Cit[]> {
    const bizTypeIds = bizTypes.map((_) => _._id);
    const data = [
      {
        name: "root",
        displayName: "根节点",
        parentName: "",
        bizTypes: bizTypeIds,
      },
      {
        name: "frontend",
        displayName: "前端",
        parentName: "root",
        bizTypes: bizTypeIds,
      },
      {
        name: "NodeJS",
        displayName: "NodeJS",
        parentName: "root",
        bizTypes: bizTypeIds,
      },
    ];
    return Promise.all(data.map((_) => this.citService.create(_)));
  }
}
