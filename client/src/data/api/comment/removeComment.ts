import { api } from "../apiInterceptor.ts";

export const removeComment = async (commentId: string) => {
  try {
    const res = await api<{ message: string }>(`/comments/${commentId}`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
