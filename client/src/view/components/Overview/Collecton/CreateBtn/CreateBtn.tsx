import { Fab, Tooltip } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";
import { useState } from "react";
import { CollectionModal } from "../CollectionModal/CollectionModal.tsx";

export const CreateBtn = () => {
  const [open, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <CollectionModal isOpen={open} onClose={handleIsOpen} />
      <Tooltip title={"Create a new collection!"} placement="left-start" arrow>
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          children={<LibraryAdd />}
          onClick={handleIsOpen}
        />
      </Tooltip>
    </>
  );
};
