import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AdminPanelSettings,
  Collections,
  DarkMode,
  LightMode,
  Login,
  Search,
} from "@mui/icons-material";
import { isAuth, roleStore, ROUTER_PATHS, themeStore } from "../../../../data";
import { observer } from "mobx-react";

export const Header = observer(() => {
  const theme = themeStore.theme;

  const handleChangeTheme = () => {
    themeStore.changeTheme();
  };

  return (
    <>
      <AppBar position="static" color={"transparent"} elevation={20}>
        <Toolbar className={"w-full flex flex-row justify-between"}>
          <Box className={"flex flex-row items-center"}>
            <Button
              size="large"
              sx={{ mr: 2 }}
              component={Link}
              startIcon={<Collections />}
              color={"inherit"}
              variant={"text"}
              to={ROUTER_PATHS.DEFAULT}
            >
              Collectify
            </Button>
          </Box>

          <div className={"w-1/2  2xl:block hidden"}>
            <TextField
              size={"small"}
              placeholder={"Search..."}
              className={"w-full"}
              InputProps={{ startAdornment: <Search className={"mr-3"} /> }}
            />
          </div>

          <Box>
            {roleStore.isAdmin() && (
              <Tooltip title={"Go to admin panel"}>
                <IconButton component={Link} to={"/admin"} color={"secondary"}>
                  <AdminPanelSettings />
                </IconButton>
              </Tooltip>
            )}
            <IconButton onClick={handleChangeTheme} color={"secondary"}>
              {theme === "dark" ? <DarkMode /> : <LightMode />}
            </IconButton>

            {isAuth() && (
              <Button
                color={"inherit"}
                variant={"text"}
                component={Link}
                to={ROUTER_PATHS.COLLECTION}
                className={""}
              >
                My_collection
              </Button>
            )}

            <Button
              component={Link}
              to={ROUTER_PATHS.SIGN_IN}
              color="inherit"
              endIcon={<Login />}
            >
              Log in
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
});
