import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { IUser } from "src/Interfaces/IUser";
import getAxiosInstance from "src/api/interceptors";

const UserList: React.FC = () => {
  const [users, setUsers] = React.useState<{
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

  React.useEffect(() => {
    const fetchUsers = async () => {
      const responce = await getAxiosInstance(
        `${import.meta.env.VITE_APP_API_URL}`
      ).get(`/admin-panel/users?page=${users.page}&perPage=${users.perPage}`);

      if (responce.status === 200) {
        const data = await responce.data;
        setUsers(data);
      }
    };

    fetchUsers();
  }, [users.page, users.perPage]);

  const handleBlock = (userId: string) => {
    // Implement block logic here
    console.log(`Blocked user with ID: ${userId}`);
  };

  const handleGetDetails = (userId: string) => {
    // Implement get details logic here
    console.log(`Get details for user with ID: ${userId}`);
  };

  return (
    <div>
      {users.data.map((user) => (
        <Card key={user.id} sx={{ margin: "10px 0", padding: "10px" }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
            <Typography>
              Birth Date: {new Date(user.birthDate).toLocaleDateString()}
            </Typography>
            <Typography>
              Created At: {new Date(user.createdAt).toLocaleString()}
            </Typography>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleGetDetails(user.id)}
                sx={{ marginRight: "10px" }}
              >
                Get details
              </Button>
              {user.role !== "admin" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBlock(user.id)}
                >
                  Block
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
