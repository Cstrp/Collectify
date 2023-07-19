import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { ThemeListProps } from "./ThemeListProps.ts";
import { api } from "../../../../data";

export const ThemeList = ({ themes, setThemes }: ThemeListProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveTheme = (topic: string) => {
    api
      .delete<{ message: string }>(`topics/${topic}`)
      .then(m => enqueueSnackbar(m.data.message))
      .catch(e => console.log(e));

    setThemes(prevState => prevState.filter(t => t !== topic));
  };

  return (
    <div className={"py-5 flex flex-col gap-5"}>
      <Typography>Topics:</Typography>
      <List className={"max-h-40 overflow-y-auto"}>
        {themes.map(theme => (
          <ListItem key={theme}>
            <ListItemText>{theme}</ListItemText>
            <IconButton onClick={() => handleRemoveTheme(theme)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
