import { HeartBroken } from "@mui/icons-material";

export const NoImage = ({ text }: { text: string }) => {
  return (
    <div
      className={
        "flex flex-col text-center items-center justify-center w-full gap-5"
      }
    >
      <HeartBroken fontSize={"large"} />
      <span className={"w-full"}>Oops... {text}</span>
    </div>
  );
};
