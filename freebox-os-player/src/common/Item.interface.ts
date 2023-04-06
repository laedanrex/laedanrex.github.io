import {ItemType} from "./ItemType.enum";

export interface Item {
  type?: ItemType,
  classes?: string,
  url?: string,
  name?: string,
  size?: string,
  date?: string,
}