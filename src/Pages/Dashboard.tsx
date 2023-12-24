import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getAxiosInstance from "src/api/interceptors";

const Dashboard: React.FC = () => {
  const userRole = useSelector(
    (state: any) => state.user.userData?.role || undefined
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [driverLicense, setDriverLicense] = useState("");
  const [isDriverAccount, setIsDriverAccount] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCardClick = (isDriver: boolean) => {
    setIsDriverAccount(isDriver);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setError("");
  };

  const handleSnackbarClose = () => {
    setSuccessMessage("");
    navigate("/app/signin");
  };

  const handleContinueClick = async () => {
    if (isDriverAccount) {
      const isValidDriverLicense = /^([A-Za-z]{2}\d{7})$/.test(driverLicense);

      if (!isValidDriverLicense) {
        setError("Invalid driver license format (example: AB1234567)");
        return;
      }

      try {
        const resp = await getAxiosInstance(
          import.meta.env.VITE_APP_API_URL
        ).post(`/driver`, {
          headers: {
            "Content-Type": "application/json",
          },
          driverLicense,
        });

        console.log(resp.data);

        // Remove tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setSuccessMessage("Driver account was successfully created!");
        setOpenDialog(false);
        setError("");
      } catch (error) {
        console.error("Error creating driver account:", error);
        setError("Error creating driver account. Please try again.");
      }
    } else {
      try {
        const resp = await getAxiosInstance(
          import.meta.env.VITE_APP_API_URL
        ).post(`/customer`, {
          headers: {
            "Content-Type": "application/json",
          },
          // Add customer-specific data here
        });

        console.log(resp.data);

        dispatch(clearUserData());

        // Remove tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setSuccessMessage("Customer account was successfully created!");
        setOpenDialog(false);
        setError("");
      } catch (error) {
        console.error("Error creating customer account:", error);
        setError("Error creating customer account. Please try again.");
      }
    }
  };

  if (!userRole)
    return (
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Typography variant="h3">Dashboard</Typography>
        <Typography variant="h4">
          Log in{" "}
          <Link
            style={{ color: "blue", textDecoration: "underline" }}
            to="/app/signin"
          >
            here
          </Link>{" "}
          or sign up{" "}
          <Link
            style={{ color: "blue", textDecoration: "underline" }}
            to="/app/signup"
          >
            here
          </Link>
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Typography variant="h3">Dashboard</Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Allow cards to wrap to the next line
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {userRole === "customer" && (
          <>
            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Create order{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/create-order"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can create order here(only for customers)
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Show my orders{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/customer-orders"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see your orders here(only for customers)
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        {userRole === "user" && (
          <>
            <Card
              onClick={() => handleCardClick(false)}
              sx={{ width: "250px", height: "150px", my: 2 }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Create customer account
                </Typography>
                <Typography variant="body1">
                  You can create customer account by clicking here
                </Typography>
              </CardContent>
            </Card>
            <Card
              onClick={() => handleCardClick(true)}
              sx={{ width: "250px", height: "150px", my: 2 }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Create driver account
                </Typography>
                <Typography variant="body1">
                  You can create driver account by clicking here
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        {userRole === "driver" && (
          <>
            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Show my orders{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/driver-orders"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see your orders here(only for drivers)
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Show available orders{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/available-orders"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see available orders here(only for drivers)
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Show current order{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/current-order"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see current order here(only for drivers)
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        {userRole === "admin" && (
          <>
            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Show all users{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/all-users"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see all users here(only for admins)
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Admin panel{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/admin-panel"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see admin panel here(only for admins)
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ width: "250px", height: "150px", my: 2 }}>
              <CardContent
                sx={{
                  display: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Show complaints{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to="/app/complaints"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  You can see complaints here(only for admins)
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        <Card sx={{ width: "250px", height: "150px", my: 2 }}>
          <CardContent
            sx={{
              display: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Show my profile{" "}
              <Link
                style={{ color: "blue", textDecoration: "underline" }}
                to="/app/profile"
              >
                here
              </Link>
            </Typography>
            <Typography variant="body1">
              You can see your profile here
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to create an account?</Typography>
          {isDriverAccount && (
            <>
              <TextField
                label="Driver License"
                value={driverLicense}
                onChange={(e) => setDriverLicense(e.target.value)}
                fullWidth
                margin="normal"
              />
              {error && <Alert severity="error">{error}</Alert>}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleContinueClick} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
    </Container>
  );
};

export default Dashboard;
