import { createTheme } from "@mui/material";
import { breakpoints } from "./breakpoints";

export const lightTheme = createTheme({
  ...breakpoints,
  palette: {
    mode: "light",
    primary: { main: "#FFFFFFCC" },
    secondary: { main: "#F9F9F9", light: "#370031" },
    background: { default: "#F9F9F919" },
    text: { primary: "#F9F9F9", secondary: "#FFFFFF0C" },
    error: { main: "#E57373" },
  },
});
