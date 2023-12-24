import { Container, Grid, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminPanelNavigation = () => {
  const currentPage = window.location.pathname.split("/").pop();

  return (
    <Grid item xs={3}>
      <Typography variant="h6">Tables:</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <ListItem
          button
          component="a"
          href="/app/admin-panel/users"
          key="Users"
          sx={{
            backgroundColor: currentPage === "users" ? "#e0e0e0" : "",
          }}
        >
          Users
        </ListItem>

        <ListItem
          button
          component="a"
          href="/app/admin-panel/orders"
          key="Orders"
          sx={{
            backgroundColor: currentPage === "orders" ? "#e0e0e0" : "",
          }}
        >
          Orders
        </ListItem>

        <ListItem
          button
          component="a"
          href="/app/admin-panel/complaints"
          key="Complaints"
          sx={{
            backgroundColor: currentPage === "complaints" ? "#e0e0e0" : "",
          }}
        >
          Complaints
        </ListItem>

        <ListItem
          button
          component="a"
          href="/app/admin-panel/tariffs"
          key="Tariffs"
          sx={{
            backgroundColor: currentPage === "tariffs" ? "#e0e0e0" : "",
          }}
        >
          Tariffs
        </ListItem>

        <ListItem
          button
          component="a"
          href="/app/admin-panel/drivers"
          key="Drivers"
          sx={{
            backgroundColor: currentPage === "drivers" ? "#e0e0e0" : "",
          }}
        >
          Drivers
        </ListItem>

        <ListItem
          button
          component="a"
          href="/app/admin-panel/customers"
          key="Vehicles"
          sx={{
            backgroundColor: currentPage === "customers" ? "#e0e0e0" : "",
          }}
        >
          Customers
        </ListItem>
      </Stack>
    </Grid>
  );
};

const AdminPanel = () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "admin-panel") {
    window.location.href = "/app/admin-panel/users";
  }

  return (
    <Grid
      container
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <AdminPanelNavigation />
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
