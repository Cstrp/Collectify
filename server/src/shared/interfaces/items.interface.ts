export interface Items {
  id?: string;
  title: string;
  description?: string;
  image?: string;

  comments: Comments[];
  likes: Likes[];

  collectionId?: string;
}

export type Comments = {
  id?: string;
  content: string;
  userId?: string;
  itemId?: string;
};

export type Likes = {
  id?: string;
  userId?: string;
  itemId?: string;
};
