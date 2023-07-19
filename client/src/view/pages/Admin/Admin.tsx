import { useEffect, useState } from "react";
import { api, User } from "../../../data";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { UserTable } from "../../components/Admin/UserTable/UserTable.tsx";
import { ThemeList } from "../../components/Admin/ThemeList/ThemeList.tsx";

export const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get<User[]>("/users");

        setUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await api.get<string>("/listOfCollectibles.txt");
        const fetchedThemes = res.data
          .split("\n")
          .filter(Boolean)
          .map(str => str.trim());
        setThemes(fetchedThemes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchThemes();
  }, []);

  const handleAddTheme = () => {
    api
      .post<{ message: string }>("/topics", { topic: value })
      .then(m => enqueueSnackbar(m.data.message))
      .catch(e => console.log(e));
    setThemes(prevState => [...prevState, value]);
    setValue("");
  };

  return (
    <div className={"w-full"}>
      <UserTable users={users} setUsers={setUsers} />
      <div className={"mt-5"}>
        <ThemeList themes={themes} setThemes={setThemes} />
        <div className={"w-full mt-5"}>
          <TextField
            className={"w-full"}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Add new theme..."}
            InputProps={{
              endAdornment: (
                <IconButton type={"submit"} onClick={handleAddTheme}>
                  <Add />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};
