import { GridColDef } from "@mui/x-data-grid";
import { Item } from "../../../../../data";
import moment from "moment/moment";
import { ItemActions } from "../ItemActions/ItemActions.tsx";

export const cols: GridColDef<Item>[] = [
  { field: "id", headerName: "ID", width: 100, align: "left" },
  { field: "title", headerName: "Title", width: 100, align: "left" },

  {
    field: "image",
    headerName: "Preview image",
    width: 250,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: params => (
      <img
        src={params.row.image}
        alt={params.row.title}
        className={"h-12 max-w-[50px]"}
      />
    ),
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 250,
    align: "left",
    valueFormatter: params =>
      moment(params.value).format("DD/MMMM/YYYY HH:mm:ss"),
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 250,
    align: "left",
    valueFormatter: params =>
      moment(params.value).format("DD/MMMM/YYYY HH:mm:ss"),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    disableColumnMenu: true,
    hideSortIcons: true,
    renderCell: params => {
      return (
        <>
          <ItemActions item={params.row} />
        </>
      );
    },
  },
];
