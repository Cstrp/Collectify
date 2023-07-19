import { User } from "../../../data";

export const initialValues: Pick<User, "username" | "email" | "password"> = {
  username: "",
  email: "",
  password: "",
};
