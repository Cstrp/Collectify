import { User } from "../../../../data";
import { Dispatch, SetStateAction } from "react";

export interface UserTableProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}
