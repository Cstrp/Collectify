export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role?: ROLE;
}

export const enum ROLE {
  USER = "user",
  ADMIN = "admin",
}
