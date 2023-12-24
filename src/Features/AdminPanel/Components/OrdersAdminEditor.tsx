import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IOrder } from "src/Interfaces/IOrder";
import getAxiosInstance from "src/api/interceptors";

const OrdersAdminEditor = () => {
  const [orders, setOrders] = useState<{
    data: IOrder[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  }>({
    data: [],
    total: 0,
    page: 1,
    perPage: 3,
    totalPages: 0,
  });

  const [showOrderEditDialog, setShowOrderEditDialog] = useState(false);
  const [showAddOrderDialog, setShowAddOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const responce = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).get(
        `${import.meta.env.VITE_APP_API_URL}/admin-panel/orders?page=${
          orders.page
        }&perPage=${orders.perPage}`
      );
      const data = await responce.data;

      setOrders(data);
    };

    fetchOrders();
  }, [orders.page, orders.perPage]);

  const handleEditOrder = async () => {
    console.log(selectedOrder);
    const sure = confirm("Are you sure you want to edit this order?");
    if (!sure) return;

    const responce = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).put(`/admin-panel/orders/${selectedOrder?.id}`, selectedOrder, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (responce.status === 200) {
      const newOrdersList = orders.data.map((order) => {
        if (order.id === selectedOrder?.id) {
          return responce.data;
        } else {
          return order;
        }
      });

      setShowOrderEditDialog(false);
      setOrders({ ...orders, data: newOrdersList });
      setSelectedOrder(null);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    const sure = confirm("Are you sure you want to delete this order?");
    if (!sure) return;

    const responce = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).delete(`/admin-panel/orders/${orderId}`);

    if (responce.status === 200) {
      const newOrdersList = orders.data.filter((order) => order.id !== orderId);
      setOrders({ ...orders, data: newOrdersList });
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Button variant="contained" color="primary" sx={{ my: "10px" }}>
          Add order
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cargo Description</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Origin Coordinates</TableCell>
              <TableCell>Destination Coordinates</TableCell>
              <TableCell>Tariff</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Statuses</TableCell>
              <TableCell>Admin functional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.cargoDescription}</TableCell>
                <TableCell>{order.origin}</TableCell>
                <TableCell>{order.destination}</TableCell>
                <TableCell>{order.weight}</TableCell>
                <TableCell>{order.volume}</TableCell>
                <TableCell>{order.currentStatus}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{`${order.originCoordinates?.latitude}, ${order.originCoordinates?.longitude}`}</TableCell>
                <TableCell>{`
                    ${order.destinationCoordinates?.latitude}, 
                    ${order.destinationCoordinates?.longitude}
                    `}</TableCell>
                <TableCell>{`${order.tariff?.name} - ${order.tariff?.value} UAH/km`}</TableCell>
                <TableCell>{`${
                  order.driver?.name ? `${order.driver?.name}` : "No driver"
                }`}</TableCell>
                <TableCell>{`
                    ${order.customer?.name ? `${order.customer?.name}` : ""}   
                `}</TableCell>
                <TableCell>
                  {order.statuses?.map((status) => (
                    <div key={status.id}>
                      {`${status.type} - ${status.dateTime}`}
                    </div>
                  ))}
                </TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <Button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderEditDialog(true);
                    }}
                    variant="contained"
                    color="primary"
                    sx={{ mr: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteOrder(order.id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={orders.totalPages}
          page={orders.page}
          color="primary"
          onChange={(event, value) => setOrders({ ...orders, page: value })}
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "15px", // Adjust the margin as needed
          }}
        />
      </TableContainer>
      <Dialog
        onClose={() => {
          setShowOrderEditDialog(false);
          setSelectedOrder(null);
        }}
        open={showOrderEditDialog}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              width: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h5">Edit order</Typography>
            <InputLabel htmlFor="cargoDescription">
              Cargo description
            </InputLabel>
            <TextField
              type="text"
              id="cargoDescription"
              value={selectedOrder?.cargoDescription}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  cargoDescription: e.target.value,
                })
              }
              fullWidth
            />
            <InputLabel htmlFor="origin">Origin</InputLabel>
            <TextField
              type="text"
              id="origin"
              value={selectedOrder?.origin}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  origin: e.target.value,
                })
              }
              fullWidth
            />

            <InputLabel htmlFor="destination">Destination</InputLabel>
            <TextField
              type="text"
              id="destination"
              value={selectedOrder?.destination}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  destination: e.target.value,
                })
              }
              fullWidth
            />

            <InputLabel htmlFor="weight">Weight</InputLabel>
            <TextField
              type="number"
              id="weight"
              value={selectedOrder?.weight}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  weight: e.target.value,
                })
              }
              fullWidth
            />

            <InputLabel htmlFor="volume">Volume</InputLabel>
            <TextField
              type="number"
              id="volume"
              value={selectedOrder?.volume}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  volume: e.target.value,
                })
              }
              fullWidth
            />

            <InputLabel htmlFor="price">Price</InputLabel>
            <TextField
              type="number"
              id="price"
              value={selectedOrder?.price}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  price: e.target.value,
                })
              }
              fullWidth
            />
          </div>
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
              setShowOrderEditDialog(false);
              setSelectedOrder(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleEditOrder}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdersAdminEditor;
