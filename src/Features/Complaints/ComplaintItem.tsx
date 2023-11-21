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

const ComplaintItem = ({ complaint }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [openVerdictDialog, setOpenVerdictDialog] = useState(false);
  const [verdictDetails, setVerdictDetails] = useState({
    verdict: "",
    setOrderStatus: false,
    orderStatus: OrderStatusTypes.CREATED, // Установите начальное значение статуса заказа
  });

  const [showComplaintStatusDialog, setShowComplaintStatusDialog] =
    useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleMakeVerdict = () => {
    setOpenVerdictDialog(true);
  };

  const handleRejectComplaint = () => {
    // Добавьте логику для обработки события "Отклонить жалобу"
    console.log("Rejecting complaint:", complaint.id);
  };

  const handleVerdictDialogClose = () => {
    setOpenVerdictDialog(false);
  };

  const handleComplaintStatusDialogClose = () =>
    setShowComplaintStatusDialog(false);

  const handleMakeVerdictConfirm = () => {
    // Добавьте логику для обработки события "Make Verdict"
    console.log("Making a verdict for complaint:", complaint.id);
    console.log("Verdict Details:", verdictDetails);
    // Здесь вы можете отправить данные на сервер или выполнить другие необходимые действия
    setOpenVerdictDialog(false);
  };

  const handleShowChangeComplaintStatus = () => {
    setShowComplaintStatusDialog(true);
  };

  const handleVerdictChange = (event) => {
    setVerdictDetails({
      ...verdictDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSetOrderStatusChange = (event) => {
    setVerdictDetails({
      ...verdictDetails,
      setOrderStatus: event.target.checked,
    });
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
        <Button onClick={handleShowDetails} size="small">
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Button onClick={handleMakeVerdict} size="small">
          Make Verdict
        </Button>
        <Button onClick={handleShowChangeComplaintStatus}>
          Set complaint status
        </Button>
        <Button onClick={handleRejectComplaint} size="small">
          Reject Complaint
        </Button>
      </CardActions>

      {/* Добавлено всплывающее окно для "Make Verdict" */}
      <Dialog
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backdropFilter: "blur(8px)" },
        }}
        open={openVerdictDialog}
        onClose={handleVerdictDialogClose}
      >
        <DialogTitle>Make Verdict</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Verdict"
            name="verdict"
            value={verdictDetails.verdict}
            onChange={handleVerdictChange}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ top: "-7px" }}>Set Order Status</InputLabel>
            <Select
              value={verdictDetails.setOrderStatus}
              onChange={handleSetOrderStatusChange}
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
              value={verdictDetails.setOrderStatus}
              onChange={handleSetOrderStatusChange}
            >
              {/* <MenuItem value="">No Change</MenuItem> */}

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
                onChange={handleSetOrderStatusChange}
                name="setOrderStatus"
              />
            }
            label="Set Order Status"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerdictDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMakeVerdictConfirm}
          >
            Make Verdict
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showComplaintStatusDialog}
        onClose={handleComplaintStatusDialogClose}
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
            <Button onClick={handleComplaintStatusDialogClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              //   onClick={handleMakeVerdictConfirm}
            >
              set status
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ComplaintItem;
