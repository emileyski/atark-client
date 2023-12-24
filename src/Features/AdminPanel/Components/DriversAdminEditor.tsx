import {
  Button,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IDriver } from "src/Interfaces/IDriver";
import getAxiosInstance from "src/api/interceptors";

const DriversAdminEditor = () => {
  const [drivers, setDrivers] = useState<{
    data: IDriver[];
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
    const fetchDrivers = async () => {
      const responce = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).get(`/driver?page=${drivers.page}&perPage=${drivers.perPage}`);

      if (responce.status === 200) {
        setDrivers(responce.data);
      }
    };

    fetchDrivers();
  }, [drivers.page, drivers.perPage]);

  return (
    <Container
      sx={{
        pt: 1,
      }}
    >
      <TableContainer>
        <Button
          variant="contained"
          color="primary"
          // onClick={() => setShowUserEditDialog(true)}
          sx={{ margin: "10px" }}
        >
          Add driver
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Driver ID</TableCell>
              <TableCell>Driver Fullname</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Driver License</TableCell>
              <TableCell>Admin functional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.data.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.id}</TableCell>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.createdAt}</TableCell>
                <TableCell>{driver.driverLicense}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // setSelectedUser(user);
                      // setShowUserEditDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      // handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={drivers.totalPages}
        page={drivers.page}
        color="primary"
        onChange={(event, value) => setDrivers({ ...drivers, page: value })}
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "15px", // Adjust the margin as needed
        }}
      />
    </Container>
  );
};

export default DriversAdminEditor;
