import { Fields, Items } from '.';

export interface Collection {
  id?: string;
  title: string;
  description: string;
  theme?: string;
  image?: string;

  fields?: Fields[];
  items?: Items[];

  userId?: string;
}
