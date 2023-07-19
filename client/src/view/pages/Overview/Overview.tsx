import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  CollectionList,
  CreateBtn,
  NoData,
  RecentlyAddedList,
  TagCloud,
} from "../../components";
import {
  api,
  Collection as Collection,
  collectionStore,
  isAuth,
  roleStore,
  ROUTER_PATHS,
} from "../../../data";
import { CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { checkRole } from "../../../data/api/checkRole.ts";

export const Overview = observer(() => {
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState<boolean>(false);

  const { collections } = collectionStore;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await api.get<{ collections: Collection[] }>(
          "/collections"
        );

        const user = await checkRole();
        if (user && user.role) roleStore.setRole(user.role);

        collectionStore.setCollection(res.data.collections);
      } catch (error) {
        console.log(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchCollections();

    const collectionId = setInterval(() => {
      fetchCollections();
    }, 7777);

    return () => clearInterval(collectionId);
  }, []);

  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-5 max-h-max overflow-y-auto"
      }
    >
      {pathname === ROUTER_PATHS.COLLECTIONS ? (
        <>
          <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
            Last added:
          </Typography>
          <RecentlyAddedList />
          {loaded ? (
            <>
              <CollectionList collections={collections} />
              {isAuth() && !roleStore.isUser() && <CreateBtn />}
            </>
          ) : (
            <div className={"flex items-center justify-center"}>
              <CircularProgress color="inherit" />
            </div>
          )}
          <TagCloud />
        </>
      ) : (
        <Outlet />
      )}
      {!collections.length && <NoData />}
    </div>
  );
});
