import React, { useEffect, useState } from "react";
import { IUser } from "src/Interfaces/IUser";
import getAxiosInstance from "src/api/interceptors";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const UsersAdminEditor: React.FC = () => {
  const [users, setUsers] = useState<{
    data: IUser[];
    total: number;
    page: number;
    totalPages: number;
    perPage: number;
  }>({
    data: [],
    total: 0,
    page: 1,
    totalPages: 0,
    perPage: 5,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const responce = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).get(`/admin-panel/users?page=${users.page}&perPage=${users.perPage}`);

      if (responce.status === 200) {
        setUsers(responce.data);
      }
    };

    fetchUsers();
  }, [users.page, users.perPage]);

  const [showUserEditDialog, setShowUserEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleEditUser = async () => {
    console.log(selectedUser);
    const sure = confirm("Are you sure you want to edit this user?");
    if (!sure) return;

    const responce = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).put(`/admin-panel/users/${selectedUser?.id}`, selectedUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (responce.status === 200) {
      const newUsersList = users.map((user) => {
        if (user.id === selectedUser?.id) {
          return selectedUser;
        } else {
          return user;
        }
      });

      setUsers(newUsersList);
      setSelectedUser(null);
      setShowUserEditDialog(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const sure = confirm("Are you sure you want to delete this user?");
    if (!sure) return;

    const responce = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).delete(`/admin-panel/users/${userId}`);

    if (responce.status === 200) {
      const newUsersList = users.filter((user) => user.id !== userId);
      setUsers(newUsersList);
    }
  };

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <Container
      sx={{
        pt: 1,
      }}
    >
      <TableContainer component={Paper}>
        <Button
          variant="contained"
          color="primary"
          // onClick={() => setShowUserEditDialog(true)}
          sx={{ margin: "10px" }}
        >
          Add user
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Admin functional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {`${new Date(user?.birthDate).toLocaleDateString()}`}
                </TableCell>
                <TableCell>{`${user?.createdAt}`}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserEditDialog(true);
                    }}
                    sx={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleDeleteUser(user.id)}
                    sx={{ marginRight: "10px", backgroundColor: "red" }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={users.totalPages}
          page={users.page}
          color="primary"
          onChange={(event, value) => setUsers({ ...users, page: value })}
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "15px", // Adjust the margin as needed
          }}
        />
      </TableContainer>
      <Dialog
        open={showUserEditDialog}
        onClose={() => setShowUserEditDialog(false)}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "500px",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Edit user</Typography>

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            placeholder="Email"
            id="email"
            value={selectedUser?.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextField
            placeholder="Name"
            id="name"
            value={selectedUser?.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />

          <InputLabel htmlFor="birthDate">Birth Date</InputLabel>

          <Input
            id="birthDate"
            type="date"
            value={selectedUser?.birthDate}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, birthDate: e.target.value })
            }
          />

          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            id="role"
            placeholder="Role"
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="driver">Driver</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setShowUserEditDialog(false);
              setSelectedUser(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleEditUser}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export async function loader() {
  const responce = await getAxiosInstance(import.meta.env.VITE_APP_API_URL).get(
    "/admin-panel/users"
  );

  if (responce.status === 200) {
    return responce.data;
  } else {
    return [];
  }
}

export default UsersAdminEditor;
