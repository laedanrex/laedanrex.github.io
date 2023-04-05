export interface Item {
  type?: ItemType,
  classes?: string,
  url?: string,
  name?: string,
  size?: string,
  date?: string,
}

export enum ItemType {
  FOLDER = "FOLDER",
  OCTET_STREAM = "OCTET_STREAM",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
