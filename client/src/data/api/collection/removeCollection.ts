import { api } from "../apiInterceptor.ts";

export const removeCollection = async (collectionId: string) => {
  try {
    const res = await api.delete<{ message: string }>(
      `http://localhost:8080/api/collections/${collectionId}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
