import { User } from "../../../data";

export const initialValues: Pick<User, "email" | "password"> = {
  email: "",
  password: "",
};
