import { getLs } from "./ls.ts";

export const isAuth = (): boolean => {
  const token = getLs("token");

  return !!token;
};
