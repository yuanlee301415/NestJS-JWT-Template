export interface PageQuery {
  current: number;
  pageSize: number;
  keyword?: string;
  [key: string]: any;
}
