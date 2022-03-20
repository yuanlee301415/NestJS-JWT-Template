import { Cit } from "./schemas/cit.schema";

export interface CitTreeItem extends Cit {
  children: Cit[];
}

export type CitTreeData = Array<CitTreeItem>;
