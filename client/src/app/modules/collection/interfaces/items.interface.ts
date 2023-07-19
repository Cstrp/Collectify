import { Fields } from './fields.interface';
import { Comment } from './comment.interface';
import { Like } from './like.interface';

export interface Items {
  id?: string;
  title: string;
  description: string;
  fields?: Fields[];
  tags?: string[];
  comments?: Comment[];
  likes?: Like[];
  createdAt?: Date;
  updatedAt?: Date;
}
