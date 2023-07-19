import { UserTableProps } from "./UserTableProps.ts";
import { IconButton } from "@mui/material";
import { ChangeCircle } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { changeRole } from "../../../../data/api/changeRole.ts";
import { ROLE } from "../../../../data";
import { useSnackbar } from "notistack";

export const UserTable = ({ users, setUsers }: UserTableProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeRole = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user._id === userId) {
        changeRole(userId, user.role === ROLE.USER ? ROLE.ADMIN : ROLE.USER)
          .then(m => enqueueSnackbar(m?.message))
          .catch(e => console.log(e));
        return {
          ...user,
          role: user.role === ROLE.USER ? ROLE.ADMIN : ROLE.USER,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  return (
    <DataGrid
      autoHeight
      sx={{ width: "750px" }}
      columns={[
        { field: "_id", headerName: "ID", width: 100 },
        { field: "username", headerName: "Username", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "role", headerName: "Role", width: 100 },
        {
          field: "Change role",
          headerName: "Change role",
          width: 100,
          renderCell: params => (
            <IconButton onClick={() => handleChangeRole(params.row._id!)}>
              <ChangeCircle />
            </IconButton>
          ),
        },
      ]}
      rows={users.map((user, idx) => ({ id: idx + 1, ...user }))}
      hideFooter
    />
  );
};
