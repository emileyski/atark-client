import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import getAxiosInstance from "src/api/interceptors";

const TariffsAdminEditor: React.FC = () => {
  const [tariffs, setTariffs] = useState<{
    data: any[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  }>({
    data: [],
    total: 0,
    page: 1,
    perPage: 5,
    totalPages: 0,
  });
  const [showTariffEditDialog, setShowTariffEditDialog] = useState(false);
  const [showTariffAddDialog, setShowTariffAddDialog] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  useEffect(() => {
    const fetchTariffs = async () => {
      const response = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).get(
        `/admin-panel/tariffs?page=${tariffs.page}&perPage=${tariffs.perPage}`
      );

      if (response.status === 200) {
        setTariffs(response.data);
      }
    };

    fetchTariffs();
  }, [
    tariffs.page,
    tariffs.perPage,
    showTariffEditDialog,
    showTariffAddDialog,
  ]);

  const handleEditTariff = async () => {
    console.log(selectedTariff);
    const sure = window.confirm("Are you sure you want to edit this tariff?");
    if (!sure) return;

    const response = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).put(
      `/admin-panel/tariffs/${selectedTariff?.id}`,
      {
        ...selectedTariff,
        value: Number(selectedTariff.value),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const newTariffsData = tariffs.data.map((tariff) => {
        if (tariff.id === selectedTariff?.id) {
          return selectedTariff;
        } else {
          return tariff;
        }
      });

      setTariffs({
        ...tariffs,
        data: newTariffsData,
      });
      setSelectedTariff(null);
      setShowTariffEditDialog(false);
    }
  };

  const handleAddTariff = async () => {
    console.log(selectedTariff);
    const sure = window.confirm("Are you sure you want to add this tariff?");
    if (!sure) return;

    const response = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).post(
      `/admin-panel/tariffs`,
      {
        ...selectedTariff,
        value: Number(selectedTariff.value),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const newTariffsList = [...tariffs.data, response.data];

      const totalPages = Math.ceil(tariffs.total + 1 / tariffs.perPage);

      setTariffs({
        ...tariffs,
        total: tariffs.total + 1,
        totalPages,
        data: newTariffsList,
      });
      setSelectedTariff(null);
      setShowTariffAddDialog(false);
    }
  };

  const handleDeleteTariff = async (id: number) => {
    const sure = window.confirm("Are you sure you want to delete this tariff?");
    if (!sure) return;

    const response = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).delete(`/admin-panel/tariffs/${id}`);

    if (response.status === 200) {
      const newTariffsList = tariffs.data.filter((tariff) => tariff.id !== id);
      setTariffs({
        data: newTariffsList,
        total: tariffs.total - 1,
        page: tariffs.page,
        perPage: tariffs.perPage,
        totalPages: Math.ceil((tariffs.total - 1) / tariffs.perPage),
      });
    }
  };

  if (!tariffs || tariffs.data.length === 0) {
    return <div>No tariffs found</div>;
  }

  return (
    <Container sx={{ pt: 1 }}>
      <TableContainer component={Paper}>
        <Button
          sx={{ my: "10px" }}
          variant="contained"
          color="primary"
          onClick={() => setShowTariffAddDialog(true)}
        >
          Add new tariff
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Admin Functional
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tariffs.data.map((tariff) => (
              <TableRow key={tariff.id}>
                <TableCell>{tariff.id}</TableCell>
                <TableCell>{tariff.value}</TableCell>
                <TableCell>{tariff.name}</TableCell>
                <TableCell>{tariff.description}</TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedTariff(tariff);
                      setShowTariffEditDialog(true);
                    }}
                    sx={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleDeleteTariff(tariff.id)}
                    sx={{ marginRight: "10px", backgroundColor: "red" }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={tariffs.totalPages}
          page={tariffs.page}
          color="primary"
          onChange={(event, value) => setTariffs({ ...tariffs, page: value })}
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "15px", // Adjust the margin as needed
          }}
        />
      </TableContainer>
      <Dialog
        open={showTariffEditDialog}
        onClose={() => {
          setShowTariffEditDialog(false);
          setSelectedTariff(null);
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "500px",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Edit Tariff</Typography>

          <InputLabel htmlFor="value">Value</InputLabel>
          <TextField
            placeholder="Value"
            id="value"
            value={selectedTariff?.value || ""}
            onChange={(e) =>
              setSelectedTariff({ ...selectedTariff, value: e.target.value })
            }
          />
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextField
            placeholder="Name"
            id="name"
            value={selectedTariff?.name || ""}
            onChange={(e) =>
              setSelectedTariff({ ...selectedTariff, name: e.target.value })
            }
          />

          <InputLabel htmlFor="description">Description</InputLabel>
          <TextField
            placeholder="Description"
            id="description"
            value={selectedTariff?.description || ""}
            onChange={(e) =>
              setSelectedTariff({
                ...selectedTariff,
                description: e.target.value,
              })
            }
          />
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
              setShowTariffEditDialog(false);
              setSelectedTariff(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditTariff}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showTariffAddDialog}
        onClose={() => {
          setShowTariffAddDialog(false);
          setSelectedTariff(null);
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "500px",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Add Tariff</Typography>

          <InputLabel htmlFor="value">Value</InputLabel>
          <TextField
            placeholder="Value"
            id="value"
            value={selectedTariff?.value || ""}
            onChange={(e) =>
              setSelectedTariff({ ...selectedTariff, value: e.target.value })
            }
          />
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextField
            placeholder="Name"
            id="name"
            value={selectedTariff?.name || ""}
            onChange={(e) =>
              setSelectedTariff({ ...selectedTariff, name: e.target.value })
            }
          />

          <InputLabel htmlFor="description">Description</InputLabel>
          <TextField
            placeholder="Description"
            id="description"
            value={selectedTariff?.description || ""}
            onChange={(e) =>
              setSelectedTariff({
                ...selectedTariff,
                description: e.target.value,
              })
            }
          />

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setShowTariffAddDialog(false);
                setSelectedTariff(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTariff}
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TariffsAdminEditor;
