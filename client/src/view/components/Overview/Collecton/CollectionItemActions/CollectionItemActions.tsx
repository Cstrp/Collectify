import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Delete, Details, Edit } from "@mui/icons-material";
import {
  Collection,
  collectionStore,
  isAuth,
  removeCollection,
  roleStore,
  ROUTER_PATHS,
} from "../../../../../data";
import { useState } from "react";
import { CollectionModal } from "..";
import { observer } from "mobx-react";
import { useSnackbar } from "notistack";

export const CollectionItemActions = observer(
  ({
    collectionId,
    collection,
  }: {
    collectionId: string;
    collection?: Collection;
  }) => {
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { pathname } = useLocation();

    const handleIsOpen = () => {
      setOpen(!open);
    };

    const handleRemove = () => {
      removeCollection(collectionId).then(m => enqueueSnackbar(m?.message));
      collectionStore.removeCollection(collectionId);
    };

    const too = `/collections/${collectionId}`;
    const isCollectionPage = pathname === ROUTER_PATHS.COLLECTION;

    return (
      <>
        {isAuth() && roleStore.isUser() && (
          <ButtonGroup>
            {isCollectionPage && (
              <>
                <Tooltip title="View Details" placement="top" arrow>
                  <IconButton
                    component={Link}
                    to={`/collection/${collectionId}`}
                  >
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
              </>
            )}

            <CollectionModal
              isOpen={open}
              onClose={handleIsOpen}
              collectionId={collectionId}
              collection={collection}
            />
          </ButtonGroup>
        )}

        {roleStore.isAdmin() && (
          <ButtonGroup>
            <Tooltip title="View Details" placement="top" arrow>
              <IconButton component={Link} to={`/collection/${collectionId}`}>
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
        )}

        {!isCollectionPage && !roleStore.isAdmin() && (
          <Tooltip title="View Details" placement="top" arrow>
            <IconButton component={Link} to={too}>
              <Details color="inherit" />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  }
);
