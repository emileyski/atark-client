import UserList from "@Features/User/UserList";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { IUser } from "src/Interfaces/IUser";
import getAxiosInstance from "src/api/interceptors";
import { Container } from "@mui/material";

const AllUsers: React.FC = () => {
  const users: IUser[] = useLoaderData() as IUser[];

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <Container sx={{ pt: 1 }}>
      <UserList users={users} />
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

export default AllUsers;
