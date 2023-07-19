import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { Delete, Details, Edit } from "@mui/icons-material";
import {
  isAuth,
  Item,
  itemsStore,
  removeItem,
  roleStore,
} from "../../../../../data";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ItemModal } from "..";
import { observer } from "mobx-react";

export const ItemActions = observer(({ item }: { item: Item }) => {
  const [open, setOpen] = useState<boolean>(false);
  const itemId = item._id;
  const { pathname } = useLocation();

  const handleIsOpen = () => {
    setOpen(!open);
  };

  const handleRemove = () => {
    if (itemId) {
      itemsStore.removeItem(itemId);
      removeItem(itemId);
    }
  };

  const isCollectionPage = pathname.split("/")[1] === "collection";

  return (
    <>
      {isAuth() && roleStore.isUser() && (
        <ButtonGroup>
          {isCollectionPage && (
            <>
              <Tooltip title="View Details" placement="top" arrow>
                <IconButton component={Link} to={`/items/${item._id}`}>
                  <Details color="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Collection" placement="top" arrow>
                <IconButton color="inherit" onClick={handleIsOpen}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Collection" placement="top" arrow>
                <IconButton color="inherit" onClick={handleRemove}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <ItemModal
                isOpen={open}
                onClose={handleIsOpen}
                itemId={itemId || ""}
                item={item}
              />
            </>
          )}
        </ButtonGroup>
      )}

      {roleStore.isAdmin() && (
        <>
          <ButtonGroup>
            <Tooltip title="View Details" placement="top" arrow>
              <IconButton component={Link} to={`/items/${item._id}`}>
                <Details color="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Collection" placement="top" arrow>
              <IconButton color="inherit" onClick={handleIsOpen}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Collection" placement="top" arrow>
              <IconButton color="inherit" onClick={handleRemove}>
                <Delete />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </>
      )}

      {!isCollectionPage && !roleStore.isAdmin() && (
        <Tooltip title="View Details" arrow>
          <IconButton component={Link} to={`/items/${item._id}`}>
            <Details color="inherit" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
});
