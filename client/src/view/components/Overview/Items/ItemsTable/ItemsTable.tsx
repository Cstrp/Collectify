import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { ItemsTableProps } from "./ItemsTableProps.ts";
import { cols } from "./cols.tsx";

export const ItemsTable = ({ items }: ItemsTableProps) => {
  const item = items.map((i, idx) => {
    return {
      ...i,
      id: idx + 1,
    };
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          p: 5,
        }}
        elevation={10}
      >
        <span className={"text-2xl font-light w-full text-center"}>
          Collection Items
        </span>
        <DataGrid
          autoHeight
          density={"comfortable"}
          className={"my-10 bg-black/20 px-4"}
          columns={cols}
          rows={item}
          hideFooter
        />
      </Paper>
    </Box>
  );
};
