import { LoginForm } from "../../components";
import { Box } from "@mui/material";

export const Login = () => {
  return (
    <Box className="flex justify-center items-center  w-full ">
      <div className="relative w-[700px] h-96 shadow shadow-white bg-transparent border-2 border-white/50 rounded-lg backdrop-blur-md flex justify-center items-center">
        <LoginForm />
      </div>
    </Box>
  );
};
