import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./view/styles";
import { SnackbarProvider } from "notistack";
import { observer } from "mobx-react";
import { themeStore } from "./data";

export const App = observer(() => {
  const theme = themeStore.theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        autoHideDuration={3000}
        variant={"info"}
        className={
          "text-white bg-transparent backdrop-blur shadow shadow-white"
        }
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
});
