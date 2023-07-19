import { api } from "../apiInterceptor.ts";
import { Comments } from "../../types";

export const createComment = async (comment: Comments) => {
  try {
    const res = await api.post<{ message: string }>(
      "/comments/create",
      comment
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
