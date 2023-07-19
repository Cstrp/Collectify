import { api } from "./apiInterceptor.ts";
import { ROLE } from "../types";

export const changeRole = async (id: string, role: ROLE) => {
  try {
    const res = await api.put<{ message: string }>(`/users/${id}`, {
      role,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
