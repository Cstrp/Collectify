import { api } from "./apiInterceptor.ts";
import { setLs } from "../utils";

export const login = async (loginData: { email: string; password: string }) => {
  try {
    const res = await api.post<{ message: string; token: string }>(
      "/auth/login",
      loginData
    );

    setLs("token", res.data.token);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
