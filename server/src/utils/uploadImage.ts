import cloudinary from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config";

cloudinary.v2.config({
  api_key: API_KEY,
  api_secret: API_SECRET,
  cloud_name: CLOUD_NAME,
});

const uploadImage = async (file: string) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file, {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      resource_type: "auto",
    });

    return res.secure_url;
  } catch (error) {
    console.log(`Image upload failed:`, error);
  }
};

export { uploadImage };
