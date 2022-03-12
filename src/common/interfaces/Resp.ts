export type Resp<T> = {
  code: number;
  data?: T;
  current?: number;
  pageSize?: number;
  total?: number;
  message?: string;
};
