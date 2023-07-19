export interface User {
  id?: string;
  username?: string;
  email: string;
  password: string;
  avatar?: string;
  role?: 'USER' | 'ADMIN';

  createdAt?: Date;
  updatedAt?: Date;
}
