import {
  List,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Container,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { IOrder } from "src/Interfaces/IOrder";

const OrderList: React.FC<{ orders: IOrder[] }> = ({ orders }) => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus === "All" ||
        order.currentStatus.toLowerCase() === filterStatus.toLowerCase()) &&
      order.cargoDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterStatus(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <FormControl fullWidth>
        <InputLabel>Status Filter</InputLabel>
        <Select value={filterStatus} onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Created">Created</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="PICKED_UP">Picked up</MenuItem>
          <MenuItem value="DELIVERED">Delivered</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Search by Cargo Description"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginTop: "1rem" }}
      />
      <List>
        {filteredOrders.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </List>
    </Container>
  );
};

export default OrderList;
