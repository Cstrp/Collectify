import { User } from "../types";
import { api } from "./apiInterceptor.ts";
import { setLs } from "../utils";

export const register = async (registerData: User) => {
  try {
    const res = await api.post<{ message: string; token: string }>(
      "/auth/register",
      registerData
    );

    setLs("token", res.data.token);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
