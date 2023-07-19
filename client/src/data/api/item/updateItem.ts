import { api } from "../apiInterceptor.ts";
import { Item } from "../../types";

export const updateItem = async (itemId: string, item: Item) => {
  try {
    const res = await api.put<{ message: string }>(`/items/${itemId}`, item);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
