import React from "react";
import ComplaintItem from "@Features/Complaints/ComplaintItem";
import { Container } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import getAxiosInstance from "src/api/interceptors";

const Complaints = () => {
  const complaints = useLoaderData() as any[];

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {complaints.map((complaint) => (
        <ComplaintItem key={complaint.id} defaulComplaint={complaint} />
      ))}
    </Container>
  );
};

export async function loader() {
  try {
    const response = await getAxiosInstance(
      import.meta.env.VITE_APP_API_URL
    ).get("/complaint/as-admin");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return [];
  }
}

export default Complaints;
