import { Welcome } from "../../components";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTER_PATHS } from "../../../data";

export const Home = () => {
  const location = useLocation();
  return (
    <>{location.pathname === ROUTER_PATHS.DEFAULT ? <Welcome /> : <Outlet />}</>
  );
};
