import { api } from "../apiInterceptor.ts";

export const removeItem = async (itemId: string) => {
  try {
    const res = await api.delete<{ message: string }>(`/items/${itemId}`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
