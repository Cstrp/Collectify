import { Fields } from './fields.interface';
import { Items } from './items.interface';

export interface Collection {
  id?: string;
  userId?: string;
  title: string;
  description: string;
  theme?: string;
  image?: string;
  fields?: Fields[];
  items?: Items[];
  createdAt?: Date;
  updatedAt?: Date;
}
