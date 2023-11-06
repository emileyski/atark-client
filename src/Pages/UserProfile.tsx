import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

import { IUser } from "src/Interfaces/IUser";
import { useSelector } from "react-redux";
import getAxiosInstance from "src/api/interceptors";

const onLogout = async () => {
  const sure = window.confirm("Are you sure you want to logout?");

  if (!sure) {
    return;
  }

  try {
    await getAxiosInstance(import.meta.env.VITE_APP_API_URL).post(
      "/auth/log-out"
    );
  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/";
};

const UserProfile: React.FC = () => {
  const user: IUser = useSelector((state) => state!.user.userData) as IUser;

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5">{user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Role: {user.role}</Typography>
          <Typography>
            Birth Date: {new Date(user.birthDate).toLocaleDateString()}
          </Typography>
          <Typography>
            Created At: {new Date(user.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="warning"
        sx={{ marginTop: 2 }}
        onClick={onLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserProfile;
