import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICustomer } from "src/Interfaces/ICustomer";
import getAxiosInstance from "src/api/interceptors";

const CustomersAdminPage = () => {
  const [customers, setCustomers] = useState<{
    data: ICustomer[];
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
    const fetchCustomers = async () => {
      const responce = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).get(`/customer?page=${customers.page}&perPage=${customers.perPage}`);

      if (responce.status === 200) {
        setCustomers(responce.data);
      }
    };

    fetchCustomers();
  }, [customers.page, customers.perPage]);

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
          Add user
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Admin functional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.createdAt}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => {
                    //   setSelectedUser(user);
                    //   setShowUserEditDialog(true);
                    // }}
                    sx={{ margin: "5px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    // onClick={() => {
                    //   setSelectedUser(user);
                    //   setShowUserDeleteDialog(true);
                    // }}
                    sx={{ margin: "5px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomersAdminPage;
