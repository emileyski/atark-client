import React from "react";
import { IOrder } from "src/Interfaces/IOrder";
import getAxiosInstance from "src/api/interceptors";
import { useLoaderData } from "react-router-dom";
import OrderItem from "@Features/Order/Components/OrderItem";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container, Box } from "@mui/material";

import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { ICoordinate } from "src/Interfaces/ICoordinate";
import { useEffect } from "react";

const CurrentOrderRouting: React.FC<{
  originPosition: ICoordinate;
  destinationPosition: ICoordinate;
  originName: string;
  destinationName: string;
}> = ({ originPosition, destinationPosition, originName, destinationName }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        {
          latLng: L.latLng(originPosition.latitude, originPosition.longitude),
          id: "origin",
          name: originName,
        },
        {
          latLng: L.latLng(
            destinationPosition.latitude,
            destinationPosition.longitude
          ),
          name: destinationName,
          id: "destination",
        },
      ],

      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      dragWaypoints: false,
      createMarker: function (waypointIndex, waypoint, number, isVia) {
        const marker = L.marker(waypoint.latLng, {
          draggable: false,
        });

        // Add popup with city name
        marker.bindPopup(waypoint.name);

        // Update popup content while dragging

        return marker;
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, originPosition, destinationPosition, originName, destinationName]);

  return null;
};
const CurrentOrder: React.FC = () => {
  const currentOrder: IOrder = useLoaderData() as IOrder;

  return (
    <Container maxWidth="xl" sx={{ pt: 2, display: "flex" }}>
      {/* OrderItem слева */}
      <Box flex="1" pr={2}>
        <OrderItem order={currentOrder} />
      </Box>

      {/* Карта справа */}
      <Box flex="1" p={1}>
        <MapContainer center={[0, 0]} zoom={5} style={{ height: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <CurrentOrderRouting
            originName={currentOrder.origin}
            destinationName={currentOrder.destination}
            destinationPosition={currentOrder.destinationCoordinates}
            originPosition={currentOrder.originCoordinates}
          />
        </MapContainer>
      </Box>
    </Container>
  );
};

export async function loader() {
  const responce = await getAxiosInstance(import.meta.env.VITE_APP_API_URL).get(
    "/orders/current"
  );

  if (responce.status === 200) {
    return responce.data;
  } else {
    throw new Error("Something went wrong while fetching current order");
  }
}

export default CurrentOrder;
