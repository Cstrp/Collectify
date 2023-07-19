export interface User {
  id?: string;
  username?: string;
  email: string;
  password: string;
  avatar?: string;
  role?: ROLE;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}
