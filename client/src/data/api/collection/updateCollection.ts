import { Collection } from "../../types";
import { api } from "../apiInterceptor.ts";

export const updateCollection = async (
  collectionId: string,
  collection: Collection
) => {
  try {
    const res = await api.put<{ message: string }>(
      `/collections/${collectionId}`,
      collection
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
