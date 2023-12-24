import {
  Button,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IComplaint } from "src/Interfaces/IComplaint";
import getAxiosInstance from "src/api/interceptors";

const ComplaintsAdminEditor = () => {
  const [complaints, setComplaints] = useState<{
    data: IComplaint[];
    total: number;
    page: number;
    totalPages: number;
    perPage: number;
  }>({
    data: [],
    total: 0,
    page: 1,
    totalPages: 0,
    perPage: 0,
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      const responce = await getAxiosInstance(
        import.meta.env.VITE_APP_API_URL
      ).get("/admin-panel/complaints");

      if (responce.status === 200) {
        setComplaints(responce.data);
      }
    };

    fetchComplaints();
  }, [complaints.page, complaints.perPage]);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Complaint ID</TableCell>
              <TableCell>Complaint Description</TableCell>
              <TableCell>Complaint Created At</TableCell>
              <TableCell>Complaint Type</TableCell>
              <TableCell>Complaint Status</TableCell>
              <TableCell>Complaint Complainant</TableCell>
              <TableCell>Complaint Verdict</TableCell>
              <TableCell>Complaint Order ID</TableCell>
              <TableCell> Admin functional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.data.map((complaint) => (
              <TableRow
                key={complaint.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {complaint.id}
                </TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.createdAt}</TableCell>
                <TableCell>{complaint.type}</TableCell>
                <TableCell>{complaint.status}</TableCell>
                <TableCell>{complaint.complainant}</TableCell>
                <TableCell>
                  {complaint.verdict || "Verdict is not set"}
                </TableCell>
                <TableCell>{complaint.order?.id}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      const sure = confirm(
                        "Are you sure you want to delete this complaint?"
                      );
                      if (!sure) return;
                      getAxiosInstance(import.meta.env.VITE_APP_API_URL).delete(
                        `/admin-panel/complaints/${complaint.id}`
                      );
                      setComplaints({
                        ...complaints,
                        data: complaints.data.filter(
                          (c) => c.id !== complaint.id
                        ),
                      });
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          count={complaints.totalPages}
          page={complaints.page}
          color="primary"
          onChange={(event, value) =>
            setComplaints({ ...complaints, page: value })
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "15px", // Adjust the margin as needed
          }}
        />
      </TableContainer>
    </Container>
  );
};

export default ComplaintsAdminEditor;
