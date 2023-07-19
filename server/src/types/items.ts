import { Comment } from "./comment";

export interface Items {
  userId: string;
  collectionId: string;
  title: string;
  tags: string[];
  image?: string;
  fields: Record<string, string | number>;
  likes: Likes[];
  comments: Comment[];
}

export interface Likes {
  userId: string;
  itemId: string;
  isLiked: boolean;
}
