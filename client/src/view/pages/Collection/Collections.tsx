import { useEffect } from "react";
import {
  api,
  Collection as Collect,
  collectionStore,
  isAuth,
  roleStore,
  ROUTER_PATHS,
} from "../../../data";
import { observer } from "mobx-react";
import { Outlet, useLocation } from "react-router-dom";
import { CollectionList, CreateBtn, NoData } from "../../components";
import { checkRole } from "../../../data/api/checkRole.ts";

export const Collection = observer(() => {
  const location = useLocation();

  const { collections } = collectionStore;

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await api.get<{ collection: Collect[] }>("/collection");

        const user = await checkRole();
        if (user && user.role) roleStore.setRole(user.role);

        collectionStore.setCollection(res.data.collection);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollection();

    const collectionId = setInterval(() => {
      fetchCollection();
    }, 7777);

    return () => clearInterval(collectionId);
  }, []);

  return (
    <>
      {location.pathname === ROUTER_PATHS.COLLECTION ? (
        <>
          <CollectionList collections={collections} />
          {isAuth() && roleStore.isUser() && <CreateBtn />}
        </>
      ) : (
        <Outlet />
      )}
      {!collections.length && <NoData />}
    </>
  );
});
