import { api } from "../apiInterceptor.ts";
import { Item } from "../../types";

export const createItem = async (item: Item) => {
  try {
    const res = await api.post<{ message: string }>("/items/create", item);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
