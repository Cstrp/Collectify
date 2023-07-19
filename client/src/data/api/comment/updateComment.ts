import { api } from "../apiInterceptor.ts";
import { errorHandler } from "../../utils";
import { Comments } from "../../types";

export const updateComment = async (
  commentId: string,
  updatedComment: Comments
) => {
  try {
    const res = await api.put<{ message: string }>(
      `/comments/${commentId}`,
      updatedComment
    );

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};
