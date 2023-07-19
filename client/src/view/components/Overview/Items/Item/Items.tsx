import { useEffect } from "react";
import { api, Item, itemsStore, roleStore } from "../../../../../data";
import { useLocation } from "react-router-dom";
import { ItemsTable } from "../ItemsTable/ItemsTable.tsx";
import { observer } from "mobx-react";
import { CreateItemBtn } from "../CreateItemBtn/CreateItemBtn.tsx";
import { NoData } from "../../../Common";

export const Items = observer(() => {
  const { pathname } = useLocation();
  const collectionId = pathname.split("/")[2];
  const isCollection = pathname.split("/")[1] === "collection";
  const { items } = itemsStore;

  useEffect(() => {
    const fetchedItems = async () => {
      try {
        const res = await api.get<Item[]>(`/items/${collectionId}`);

        itemsStore.setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchedItems();

    const itemsId = setInterval(() => fetchedItems(), 8888);

    return () => clearInterval(itemsId);
  }, [collectionId]);

  return (
    <>
      {items.length > 0 && (
        <>
          <ItemsTable items={items} />
          {!roleStore.isUser() && <CreateItemBtn />}
        </>
      )}

      {isCollection && <CreateItemBtn />}

      {!items.length && <NoData />}
    </>
  );
});
