import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { ROUTER_PATHS } from "../../../data";

export const Welcome = () => {
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to Collectify!
      </Typography>
      <Typography variant="h6" align="center">
        Application to collect and manage your collections
      </Typography>
      <Box className={"flex flex-row justify-center"}>
        <img src={logo} alt="Collectibles" className={"max-w-[555px] "} />
      </Box>
      <Box textAlign="center" marginTop={4}>
        <Button
          size={"large"}
          component={Link}
          to={ROUTER_PATHS.COLLECTIONS}
          className={"animate-bounce"}
          sx={{
            color: "white",
            fontSize: "24px",
            px: 4,
            background: "transparent",
            textTransform: "inherit",
            backdropFilter: "blur(5px)",
            boxShadow: "0 0 20px 3px rgba(255, 255, 255, 0.4)",
          }}
        >
          Explore existing collections right now!
        </Button>
      </Box>
    </>
  );
};
