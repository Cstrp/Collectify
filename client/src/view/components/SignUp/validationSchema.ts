import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup.string().min(3).max(16).required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).max(16).required(),
});
