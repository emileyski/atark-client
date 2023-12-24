import { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import getAxiosInstance from "src/api/interceptors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData } from "@Features/User/userSlice";

export default function UserDashboard() {
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

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 2,
      }}
    >
      <Typography variant="h4">
        Welcome to the User Dashboard! Please select the account type you want
        to create: customer or driver.
      </Typography>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75vh",
        }}
      >
        <Card
          onClick={() => handleCardClick(false)}
          style={{ width: 300, height: 100, margin: "0 auto" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Create customer account
            </Typography>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleCardClick(true)}
          style={{ width: 300, height: 100, margin: "0 auto" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Create driver account
            </Typography>
          </CardContent>
        </Card>

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
    </Container>
  );
}
