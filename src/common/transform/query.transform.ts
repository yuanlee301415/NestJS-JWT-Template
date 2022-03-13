import type { PageQuery } from "../interfaces/PageQuery";

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

type Query = {
  current: string | number;
  pageSize: string | number;
  [key: string]: any;
};

@Injectable()
export class TransformIntQuery implements PipeTransform {
  CONFIG = {
    current: { min: 1, max: Infinity, default: 1 },
    pageSize: { min: 0, max: 100, default: 20 },
  };

  constructor(public fields?: string[]) {
    const common = ["current", "pageSize"];
    if (this.fields) {
      this.fields = common.concat(this.fields);
    } else {
      this.fields = common;
    }
    // console.log("TransformIntQuery>fields:\n", this.fields);
  }

  transform(query: Query, metadata: ArgumentMetadata): PageQuery {
    console.log("TransformIntQuery>query:\n", query);
    const res = {};
    this.fields.forEach((field) => {
      const config = this.CONFIG[field];
      if (config) {
        const num = Number(query[field] || config.default);
        if (Number.isNaN(num) || !Number.isSafeInteger(num)) {
          throw new BadRequestException(
            `[Validation failed]:: ${field}:${query[field]}`
          );
        }
        if (num < config.min || num > config.max) {
          throw new BadRequestException(
            `[Validation failed]:: ${field}:${query[field]}`
          );
        }
        res[field] = num;
      } else {
        res[field] = query[field];
      }
    });
    console.log("TransformIntQuery>res:\n", res);
    return res as PageQuery;
  }
}
