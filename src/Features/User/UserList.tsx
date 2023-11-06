import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { IUser } from "src/Interfaces/IUser";

const UserList: React.FC<{ users: IUser[] }> = ({ users }) => {
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
      {users.map((user) => (
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
