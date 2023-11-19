import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ComplaintTypes } from "src/Enums/ComplaintTypes.enum";

const ComplaintForm = ({ open, onClose, onSubmit }) => {
  const [complaintType, setComplaintType] = useState(ComplaintTypes.OTHER);
  const [description, setDescription] = useState("");

  const handleComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ complaintType, description });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Make a Complaint</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select the type of complaint and provide a description.
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="complaint-type-label">Complaint Type</InputLabel>
          <Select
            labelId="complaint-type-label"
            id="complaint-type"
            value={complaintType}
            onChange={handleComplaintTypeChange}
            fullWidth
          >
            {Object.values(ComplaintTypes).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Complain
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplaintForm;
