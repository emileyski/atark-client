import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { ICoordinate } from "src/Interfaces/ICoordinate";
import { IOrder } from "src/Interfaces/IOrder";
import { IOrderStatus } from "src/Interfaces/IOrderStatus";
import getAxiosInstance from "src/api/interceptors";
import { useSelector } from "react-redux";

const handleOrderAction = async (
  id: number,
  action: string,
  successMessage: string
) => {
  const sure = window.confirm(
    `Are you sure you want to ${action.toLowerCase()} this order (with ID ${id})?`
  );
  if (!sure) return;

  try {
    if (action === "PAY") {
      const response = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).post(`/payments/${id}`);
      if (response.status !== 201) {
        throw new Error("Payment failed");
      }
    } else {
      const response = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).post(`/orders/${id}/${action.toLowerCase()}`);
      if (response.status !== 201) {
        throw new Error(`Failed to ${action.toLowerCase()} order`);
      }
    }

    alert(`Order ${successMessage.toLowerCase()} successfully`);
    window.location.reload();
  } catch (error) {
    alert(error.response?.data.message || error.message);
  }
};

const handleCancelOrder = async (id: number) => {
  await handleOrderAction(id, "CANCEL", "canceled");
};

const handleAssignOrder = async (id: number) => {
  await handleOrderAction(id, "ASSIGN", "assigned");
};

const handlePickupOrder = async (id: number) => {
  await handleOrderAction(id, "PICKUP", "picked up");
};

const handleDeliverOrder = async (id: number) => {
  await handleOrderAction(id, "DELIVER", "delivered");
};

const handlePayOrder = async (id: number) => {
  await handleOrderAction(id, "PAY", "paid for");
};

const handleConfirmDelivery = async (id: number) => {
  await handleOrderAction(id, "CONFIRM-DELIVERY", "confirmed delivery for");
};

const handleRejectDelivery = async (id: number) => {
  await handleOrderAction(id, "REJECT", "rejected delivery for");
};

const handleShowAtMap = (coordinates: ICoordinate) => {
  window.open(
    `https://www.google.com/maps/search/${coordinates.latitude},${coordinates.longitude}`
  );
};

const OrderItem: React.FC<{ order: IOrder }> = ({ order }) => {
  const userRole = useSelector((state: any) => state.user?.userData?.role);

  return (
    <ListItem>
      <Card
        sx={{
          width: "100%", // Full width
          padding: 2, // Adjust padding as needed
          boxSizing: "border-box", // Ensure padding is included in width
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Order #{order.id}
          </Typography>
          <Divider />
          <ListItemText
            primary={`Cargo Description: ${order.cargoDescription}`}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1}
          >
            <Box>
              <ListItemText primary={`Origin: ${order.origin}`} />
              <ListItemText primary={`Destination: ${order.destination}`} />
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem">
              <Button
                onClick={() => handleShowAtMap(order.originCoordinates)}
                color="primary"
                variant="outlined"
              >
                Show at map
              </Button>
              <Button
                onClick={() => handleShowAtMap(order.destinationCoordinates)}
                color="primary"
                variant="outlined"
              >
                Show at map
              </Button>
            </Box>
          </Box>
          <ListItemText primary={`Weight: ${order.weight} KG`} />
          <ListItemText primary={`Volume: ${order.volume} m^3`} />
          <ListItemText primary={`Current Status: ${order.currentStatus}`} />
          <ListItemText primary={`Price: ${order.price} UAH`} />

          <Box display="flex" gap="1rem" marginBottom={1}>
            {userRole !== undefined &&
              userRole === "customer" &&
              order.currentStatus === "CREATED" && (
                <Button
                  onClick={() => handleCancelOrder(order.id)}
                  color="warning"
                  variant="contained"
                >
                  Cancel
                </Button>
              )}
            {userRole !== undefined &&
              userRole === "driver" &&
              order.currentStatus === "CREATED" && (
                <Button
                  onClick={() => handleAssignOrder(order.id)}
                  color="primary"
                  variant="contained"
                >
                  Assign Order
                </Button>
              )}

            {userRole !== undefined &&
              userRole === "driver" &&
              order.currentStatus === "ASSIGNED" && (
                <Button
                  onClick={() => handlePickupOrder(order.id)}
                  color="secondary"
                  variant="contained"
                >
                  Mark as picked up
                </Button>
              )}

            {userRole !== undefined &&
              userRole === "driver" &&
              ["PICKED_UP", "REJECTED"].includes(order.currentStatus) && (
                <Button
                  onClick={() => handleDeliverOrder(order.id)}
                  color="secondary"
                  variant="contained"
                >
                  Mark as delivered
                </Button>
              )}

            {userRole !== undefined &&
              userRole === "customer" &&
              order.currentStatus !== "CANCELLED" &&
              order.currentStatus !== "CREATED" &&
              !order.statuses!.some(
                (status: IOrderStatus) => status.type === "PAID"
              ) && (
                <Button
                  onClick={() => handlePayOrder(order.id)}
                  color="primary"
                  variant="contained"
                >
                  Pay for order
                </Button>
              )}

            {userRole !== undefined &&
              userRole === "customer" &&
              order.currentStatus === "DELIVERED" && (
                <>
                  <Button
                    onClick={() => handleRejectDelivery(order.id)}
                    color="warning"
                    variant="contained"
                  >
                    Reject delivery
                  </Button>
                  <Button
                    onClick={() => handleConfirmDelivery(order.id)}
                    color="primary"
                    variant="contained"
                  >
                    Accept delivery
                  </Button>
                </>
              )}
          </Box>
          <Divider />
          <Typography variant="subtitle1">Status History:</Typography>
          {order.statuses?.map((status: IOrderStatus) => (
            <ListItemText
              key={status.id}
              primary={`[${status.dateTime}] ${status.type}`}
              secondary={`Status ID: ${status.id}`}
            />
          ))}
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default OrderItem;
