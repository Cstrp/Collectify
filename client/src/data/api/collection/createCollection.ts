import { Collection } from "../../types";
import { api } from "../apiInterceptor.ts";

export const createCollection = async (collection: Collection) => {
  try {
    const res = await api.post<{
      message: string;
      newCollection: Collection;
    }>("/collections/create", collection);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
