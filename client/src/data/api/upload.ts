import axios from "axios";

export const upload = async (file: File | null) => {
  try {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post<{ message: string; imageUrl: string }>(
        "http://localhost:8080/api/upload",
        formData
      );

      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};
