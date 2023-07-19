import { createBrowserRouter } from "react-router-dom";
import { ROUTER_PATHS } from "./data";
import {
  Admin,
  Collection,
  DetailedItem,
  Header,
  Home,
  Items,
  Login,
  Overview,
  Register,
  Wrapper,
} from "./view";

export const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATHS.DEFAULT,
      element: (
        <>
          <Header />
          <Wrapper>
            <Home />
          </Wrapper>
        </>
      ),
      children: [
        { path: ROUTER_PATHS.SIGN_IN, element: <Login /> },
        { path: ROUTER_PATHS.SIGN_UP, element: <Register /> },
        {
          path: ROUTER_PATHS.COLLECTIONS,
          element: <Overview />,
          children: [
            { path: "/collections/:collectionId", element: <Items /> },
          ],
        },
        {
          path: ROUTER_PATHS.COLLECTION,
          element: <Collection />,
          children: [{ path: "/collection/:collectionId", element: <Items /> }],
        },
        {
          path: "/items/:itemId",
          element: <DetailedItem />,
        },
        { path: "/admin", element: <Admin /> },
      ],
    },
  ],
  {}
);
