import { createTheme } from "@mui/material";
import { breakpoints } from "./breakpoints";

export const darkTheme = createTheme({
  ...breakpoints,
  palette: {
    mode: "dark",
    primary: { main: "#212121", dark: "#00000033" },
    secondary: { main: "#ffffff", light: "#370031" },
    background: { default: "#F9F9F919" },
    text: { primary: "#F9F9F9", secondary: "#FFFFFF0C" },
    error: { main: "#E57373" },
  },
});
