import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
  Backdrop,
} from "@mui/material";
import { OrderStatusTypes } from "src/Enums/order-status.enum";
import { ComplaintStatusTypes } from "src/Enums/complaint-status.enum";
import getAxiosInstance from "src/api/interceptors";

const ComplaintItem = ({ defaulComplaint }) => {
  const [complaint, setComplaint] = useState(defaulComplaint);
  const [showDetails, setShowDetails] = useState(false);
  const [openVerdictDialog, setOpenVerdictDialog] = useState(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const [verdictDetails, setVerdictDetails] = useState({
    verdict: "",
    setOrderStatus: false,
    orderStatus: OrderStatusTypes.CREATED,
    complaintStatus: ComplaintStatusTypes.SUBMITTED,
  });

  const handleMakeVerdict = async () => {
    try {
      const responce = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).patch(`complaint/verdict`, {
        ...verdictDetails,
        status: verdictDetails.complaintStatus,
        orderStatus: verdictDetails.setOrderStatus
          ? verdictDetails.orderStatus
          : undefined,
      });

      if (responce.status === 200) {
        const { data } = responce;
        setComplaint(data);
        setOpenVerdictDialog(false);
      } else {
        alert("Some error occured!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Complaint #{complaint.id}</Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {complaint.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created At: {complaint.createdAt}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {complaint.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {complaint.status}
        </Typography>
        {showDetails && (
          <>
            <Typography variant="body2" color="text.secondary">
              Order ID: {complaint.order.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cargo Description: {complaint.order.cargoDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Origin: {complaint.order.origin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Destination: {complaint.order.destination}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {complaint.order.weight} KG
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Volume: {complaint.order.volume} m^3
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Status: {complaint.order.currentStatus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {complaint.order.price} UAH
            </Typography>
            {/* Добавьте другие детали заказа по вашему усмотрению */}
          </>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={() => setShowDetails(!showDetails)} size="small">
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Button onClick={() => setOpenVerdictDialog(true)} size="small">
          Make Verdict
        </Button>
        <Button
          onClick={() => {
            setOpenChangeStatusDialog(true);
          }}
        >
          Set complaint status
        </Button>
        <Button
          // onClick={handleRejectComplaint}
          size="small"
        >
          Reject Complaint
        </Button>
      </CardActions>

      <Dialog
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backdropFilter: "blur(8px)" },
        }}
        open={openVerdictDialog}
        onClose={() => setOpenVerdictDialog(false)}
      >
        <DialogTitle>Make Verdict</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Verdict"
            name="verdict"
            value={verdictDetails.verdict}
            onChange={(e) =>
              setVerdictDetails({ ...verdictDetails, verdict: e.target.value })
            }
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ top: "-7px" }}>Set Order Status</InputLabel>
            <Select
              value={verdictDetails.orderStatus}
              onChange={(e) =>
                setVerdictDetails({
                  ...verdictDetails,
                  orderStatus: e.target.value,
                })
              }
            >
              <MenuItem value="">No Change</MenuItem>

              {Object.values(OrderStatusTypes).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ top: "-7px" }}>Set Complaint Status</InputLabel>
            <Select
              value={verdictDetails.complaintStatus}
              onChange={(e) =>
                setVerdictDetails({
                  ...verdictDetails,
                  complaintStatus: e.target.value,
                })
              }
            >
              {Object.values(ComplaintStatusTypes).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={verdictDetails.setOrderStatus}
                onChange={(e) =>
                  setVerdictDetails({
                    ...verdictDetails,
                    setOrderStatus: e.target.checked,
                  })
                }
                name="setOrderStatus"
              />
            }
            label="Set Order Status"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenVerdictDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMakeVerdict}
          >
            Make Verdict
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openChangeStatusDialog}
        onClose={() => setOpenChangeStatusDialog(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backdropFilter: "blur(8px)" },
        }}
      >
        <DialogTitle>Change complaint status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ top: "-7px" }}>Set Complaint Status</InputLabel>
            <Select>
              {Object.values(ComplaintStatusTypes).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Button variant="contained" color="primary">
              set status
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ComplaintItem;
