const faker = require("faker");

import { Injectable } from "@nestjs/common";

import RoleEnum from "../user/role.enum";
import { User } from "../user/schemas/user.schema";
import { UserService } from "../user/user.service";

import { Goods } from "../profile/schemas/goods.schema";
import { Progress } from "../profile/schemas/progress.schema";
import { OperationLog } from "../profile/schemas/operation-log.schema";
import { ProfileService } from "../profile/profile.service";
import { Category } from "../category/schemas/category.schema";
import { CategoryService } from "../category/category.service";
import { Article } from "../article/schemas/article.schema";
import { ArticleService } from "../article/article.service";
import { Project } from "../project/schemas/project.schema";
import { ProjectService } from "../project/project.service";
import { Application } from "../application/schemas/application.schema";
import { ApplicationService } from "../application/application.service";
import { Rule } from "../rule/schemas/rule.schema";
import { RuleService } from "../rule/rule.service";
import { Task } from "../task/schemas/task.schema";
import { TaskService } from "../task/task.service";
import {
  NoticeType,
  NoticeEventStatus,
  NotificationSubType,
} from "../notice/dto/notice.dto";
import { NoticeService } from "../notice/notice.service";

const AVATARS = ["1.png", "2.png", "3.png"];

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

const COVER_MAX = 4;

@Injectable()
export class InceptionService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryService,
    private readonly projectService: ProjectService,
    private readonly applicationService: ApplicationService,
    private readonly ruleService: RuleService,
    private readonly taskService: TaskService,
    private readonly noticeService: NoticeService
  ) {}

  async main() {
    // 查询前置初始数据
    const [[users], [goodsList], [categories]] = await Promise.all([
      this.userService.findAll({ current: 1, pageSize: 0 }),
      this.profileService.findAllGoods({ current: 1, pageSize: 1 }),
      this.categoryService.findAllCategory({ current: 1, pageSize: 0 }),
    ]);

    // 创建前置初始数据
    const preInceptions: [
      Promise<User[]>,
      Promise<Goods[]>,
      Promise<Category[]>
    ] = [
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
      goodsList.length ? Promise.resolve(goodsList) : this.mockGoods(10),
      categories.length ? Promise.resolve(categories) : this.mockCategory(10),
    ];
    const [newUsers, newGoodsList, newCategories]: [
      User[],
      Goods[],
      Category[]
    ] = await Promise.all(preInceptions);
    console.log("newUsers[0]:", newUsers[0]);
    console.log("newGoodsList[0]:", newGoodsList[0]);
    console.log("newCategories[0]:", newCategories[0]);
    const admin = newUsers.find((_) => _.username === "admin");
    console.log("admin:\n", admin);

    // 查询后置初始数据
    const [
      [operationLogs, operationLogTotal],
      [progressList, progressListTotal],
      [articles, articleTotal],
      [projects, projectTotal],
      [applications, applicationTotal],
      [rules, ruleTotal],
      [tasks, taskTotal],
      [notices, noticeTotal],
    ] = await Promise.all([
      this.profileService.findAllOperationLog({ current: 1, pageSize: 1 }),
      this.profileService.findAllProgress({ current: 1, pageSize: 1 }),
      this.articleService.findAllArticle({ current: 1, pageSize: 1 }),
      this.projectService.findAll({ current: 1, pageSize: 1 }),
      this.applicationService.findAll({ current: 1, pageSize: 1 }),
      this.ruleService.findAll({ current: 1, pageSize: 1 }),
      this.taskService.findAll({ current: 1, pageSize: 1 }),
      this.noticeService.findAll({ current: 1, pageSize: 1 }),
    ]);

    // 创建后置初始数据
    const postInceptions = [
      operationLogTotal ? operationLogs : this.mockOperationLog(newUsers, 13),
      progressListTotal ? progressList : this.mockProgress(newUsers, 10),
      articleTotal ? articles : this.mockArticle(admin, newCategories, 21),
      projectTotal ? projects : this.mockProject(newUsers, admin, 21),
      applicationTotal
        ? applications
        : this.mockApplication(admin, newCategories, 21),
      ruleTotal ? rules : this.mockRule(admin, 11),
      taskTotal ? tasks : this.mockTask(newUsers, admin, 11),
      noticeTotal ? notices : this.mockNotice(newUsers, admin, 21),
    ];
    const [
      newOperationLogs,
      newProgressList,
      newArticles,
      newProjects,
      newApplications,
      newRules,
      newTasks,
    ] = await Promise.all(postInceptions);
    console.log("newOperationLogs[0]:", newOperationLogs[0]);
    console.log("newProgressList[0]:", newProgressList[0]);
    console.log("newArticles[0]:", newArticles[0]);
    console.log("newProjects[0]:", newProjects[0]);
    console.log("newApplications[0]:", newApplications[0]);
    console.log("newRules[0]:", newRules[0]);
    console.log("newTasks[0]:", newTasks[0]);

    console.log(
      `---------------------------------------AppService>onModuleInit::end---------------------------------------\n\n`
    );
  }

  async mockNotice(users, admin, total = 21) {
    const noticeTypeSize = Object.keys(NoticeType).length / 2;
    const noticeSubTypeSize = Object.keys(NotificationSubType).length / 2;
    const NoticeEventStatusSize = Object.keys(NoticeEventStatus).length / 2;
    const notices = new Array(total).fill(0).map((_, idx) => {
      const type = (Math.random() * noticeTypeSize) | 0;
      const notice = {
        title: `Mock-${NoticeType[type]}-title-${idx}`,
        type,
        subType:
          type === NoticeType.Notification
            ? (Math.random() * noticeSubTypeSize) | 0
            : void 0,
        read: false,
        desc: `Mock-${NoticeType[type]}-desc-${idx}`,
        status:
          type === NoticeType.Event
            ? (Math.random() * NoticeEventStatusSize) | 0
            : void 0,
        sender: users[(Math.random() * users.length) | 0]._id,
        receiver: admin._id,
      };
      // console.log('notice:', notice)
      return notice;
    });
    return this.noticeService.insertMany(notices);
  }

  /* mock user */
  async mockUser(usernames: string[]): Promise<User[]> {
    return Promise.all(
      usernames.map((_, idx) =>
        this.userService.create({
          username: _,
          email: `${_}@163.com`,
          password: "123456",
          mobile: `13812345678`,
        })
      )
    );
  }

  /* mock goods data */
  async mockGoods(total: number = 10): Promise<Goods[]> {
    const goodsList = Array.from({ length: total }).map(() => {
      const price = faker.datatype.float({ min: 10, max: 100 });
      const num = faker.datatype.number({ min: 10, max: 100 });
      const amount = Math.round(price * num * 100) / 100;
      return {
        amount,
        barcode: faker.datatype.uuid(),
        name: faker.lorem.words(),
        num,
        no: faker.datatype.uuid(),
        price,
      };
    });

    return this.profileService.insertManyGoods(goodsList);
  }

  /* mock progress data */
  async mockProgress(users, total: number = 10): Promise<Progress[]> {
    const rates = [
      "联系客户",
      "取货员出发",
      "取货员接单",
      "申请审批通过",
      "发起退货申请",
    ];

    const progressList = Array.from({ length: total }).map((_, idx) => {
      return {
        cost: faker.datatype.number({ min: 10, max: 10000 }),
        operator: users[(Math.random() * users.length) | 0]._id,
        rate: rates[idx % rates.length],
        status: idx % 2,
        time: new Date(new Date().getTime() - 12345678 * (idx + 1)),
      };
    });
    return this.profileService.insertManyProgress(progressList);
  }

  /* mock operation log data */
  async mockOperationLog(users, total: number = 12): Promise<OperationLog[]> {
    const types = [
      "订购关系生效",
      "财务复审",
      "部门初审",
      "提交订单",
      "创建订单",
    ];
    const logs = Array.from({ length: total }).map((_, idx) => {
      const status = idx % 2;
      const memo = status === 0 ? "很棒" : "不通过原因";
      return {
        memo,
        operator: users[idx % users.length]._id,
        status,
        type: types[idx % types.length],
      };
    });
    return this.profileService.insertManyOperationLog(logs);
  }

  /* mock category data */
  async mockCategory(total: number = 10): Promise<Category[]> {
    const categories = Array.from({ length: total }).map((_, idx) => {
      const category = {
        name: `类目-${idx}`,
      };
      // console.log("category:", category);
      return category;
    });

    return this.categoryService.insertManyCategories(categories);
  }

  /* mock article data */
  async mockArticle(admin, categories, total: number = 20): Promise<Article[]> {
    const ids = categories.map((_) => _._id);
    const articles = Array.from({ length: total }).map((_, idx) => {
      const catIds = ids
        .slice()
        .sort(() => (Math.random() < 0.5 ? -1 : 1))
        .slice(-3);
      // console.log("catIds:", catIds);
      const article = {
        avatar:
          `/uploads/logos/` +
          TITLES[idx % TITLES.length].toLowerCase() +
          ".png",
        categories: catIds,
        content: faker.lorem.text(),
        href: faker.internet.url(),
        like: faker.datatype.number({ min: 10, max: 10000 }),
        message: faker.datatype.number({ min: 10, max: 10000 }),
        star: faker.datatype.number({ min: 10, max: 10000 }),
        tags: ["Ant Design", "前端开发", "React"],
        title: `Mock-article-title-${TITLES[idx % TITLES.length]}`,
        createdBy: admin._id,
      };
      // console.log("mock article data:\n", article);
      return article;
    });
    return this.articleService.insertManyArticle(articles);
  }

  /* mock project data */
  async mockProject(users, admin, total: number = 21): Promise<Project[]> {
    const userIds = users.map((_) => _._id);
    const projects = Array.from({ length: total }).map((_, idx) => {
      const ids = userIds
        .slice()
        .sort(() => (Math.random() < 0.5 ? -1 : 1))
        .slice((-1 * idx) % userIds.length);
      const project = {
        cover: `/uploads/covers/${idx % COVER_MAX}.png`,
        description: `Mock-project-description-${idx}`,
        members: ids,
        title: `Mock-project-title-${idx}`,
        createdBy: admin._id,
      };
      return project;
    });
    return this.projectService.insertMany(projects);
  }

  /* mock application data */
  async mockApplication(
    admin,
    categories,
    total: number = 21
  ): Promise<Application[]> {
    const ids = categories.map((_) => _._id);

    const apps = Array.from({ length: total }).map((_, idx) => {
      const title = TITLES[idx % TITLES.length];
      const catIds = ids
        .slice()
        .sort(() => (Math.random() < 0.5 ? -1 : 1))
        .slice(-3);
      // console.log("catIds:", catIds);
      const app = {
        activeUser: faker.datatype.number({ min: 1000, max: 1000000 }),
        categories: catIds,
        logo: `/uploads/logos/${title.toLowerCase()}.png`,
        newUser: faker.datatype.number({ min: 1000, max: 1000000 }),
        title: `Mock-${idx}-app-title-${
          title.charAt(0).toUpperCase() + title.slice(1)
        }`,
        createdBy: admin._id,
      };
      return app;
    });
    return this.applicationService.insertMany(apps);
  }

  /* mock rule data */
  async mockRule(admin, total: number = 11) {
    const rules = Array.from({ length: total }).map((_, idx) => {
      const rule = {
        name: `Mock-rule-name-${idx}`,
        desc: faker.lorem.text(),
        createdBy: admin._id,
      };
      return rule;
    });
    return this.ruleService.insertManyRules(rules as Rule[]);
  }

  /* mock task data */
  async mockTask(users, admin, total: number = 11) {
    const tasks = Array.from({ length: total }).map((_, idx) => {
      const task = {
        desc: `Mock-task-desc-${idx}`,
        startTime: new Date(),
        logo:
          `/uploads/logos/` +
          TITLES[idx % TITLES.length].toLowerCase() +
          ".png",
        owner: users[(Math.random() * users.length) | 0]._id,
        subDescription: faker.lorem.text(),
        title: `Mock-task-title-${idx}`,
        percent: 0,
        status: 0,
        createdBy: admin._id,
      };
      return task;
    });
    return this.taskService.insertManyTasks(tasks as Task[]);
  }
}
