import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { observer } from "mobx-react";
import { themeStore } from "../../../../data";
import bg from "../../../../assets/bgg.jpg";

export const Wrapper = observer(({ children }: { children: ReactNode }) => {
  const currentTheme = themeStore.theme;

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ mt: 10 }}>{children}</Box>

      {currentTheme === "dark" ? (
        <img
          className="absolute inset-0 blur z-[-10] w-full h-full object-cover"
          src="https://e1.pxfuel.com/desktop-wallpaper/463/531/desktop-wallpaper-geometry-18638-1920x1200-px-dark-geometric.jpg"
          alt="bg"
        />
      ) : (
        <img
          className="absolute inset-0 blur z-[-10] w-full h-full  object-cover"
          src={bg}
          alt="bg"
        />
      )}
    </Container>
  );
});
