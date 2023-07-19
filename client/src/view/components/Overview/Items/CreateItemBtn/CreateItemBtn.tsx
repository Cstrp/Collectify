import { Fab, Tooltip } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";
import { ItemModal } from "../ItemModal/ItemModal.tsx";
import { useState } from "react";
import { observer } from "mobx-react";

export const CreateItemBtn = observer(() => {
  const [open, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ItemModal isOpen={open} onClose={handleIsOpen} />
      <Tooltip
        title={"Create a new item in your collection!"}
        placement="left-start"
        arrow
      >
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
});
