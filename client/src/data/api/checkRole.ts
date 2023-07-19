import { api } from "./apiInterceptor.ts";
import { User } from "../types";

export const checkRole = async () => {
  try {
    const res = await api.get<{ user: User }>("/check");

    return res.data.user;
  } catch (err) {
    console.log(err);
  }
};
