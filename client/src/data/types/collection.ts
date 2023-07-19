import { Fields } from "./fileds.ts";
import { Item } from "./item.ts";

export interface Collection {
  _id?: string;
  name: string;
  description: string;
  theme: string;
  image?: string;
  fields: Fields[];
  items?: Item[];
}
