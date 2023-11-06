// FormCreateOrder.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import styles from "./FormCreateOrder.module.css"; // Модульные стили
import { Form, FormBlock } from "@Components/Form";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { DarkButton } from "@Components/UI/Buttons";
import Routing from "@Components/UI/Routing";
import { useActionData } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormCreateOrder: React.FC = () => {
  const navigate = useNavigate();

  const actionData = useActionData();

  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");

  const [originCoordinates, setOriginCoordinates] = useState({
    latitude: 50.004,
    longitude: 36.231,
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: 50.27,
    longitude: 30.31,
  });

  const [price, setPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  const [tariffId, setTariffId] = useState(2);

  const handleCreateAnotherOrder = () => {
    // Add logic to handle creating another order
    window.location.reload();
  };

  const handleGoToDashboard = () => {
    // Add logic to redirect to Dashboard
    navigate("/app/dashboard/customer-orders");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form method="post">
          <Text fontSize="25px" color="#808080">
            Create order
          </Text>
          <FormBlock>
            <Text color="#808080">Cargo description</Text>
            <Input
              type="text"
              name="cargoDescription"
              placeholder="Cargo description"
            />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Origin (select at map)</Text>
            <Input
              value={originName}
              type="text"
              name="origin"
              placeholder="Origin"
            />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Destination (select at map)</Text>
            <Input
              value={destinationName}
              type="text"
              name="destination"
              placeholder="Destination"
            />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Weight (in KG)</Text>
            <Input type="number" name="weight" placeholder="Weight" />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Volume (in m^3)</Text>
            <Input type="number" name="volume" placeholder="Volume" />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Tariff</Text>
            <Input
              type="number"
              name="tariffId"
              value={tariffId}
              onChange={(e) => setTariffId(parseInt(e.target.value))}
              placeholder="TariffId"
            />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Distance</Text>
            <Input
              type="text"
              value={`${distance.toFixed(2)} km`}
              placeholder="This field will calculated"
            />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Estimated price</Text>
            <Input
              type="text"
              value={`${price.toFixed(2)} UAH`}
              placeholder="This field will calculated"
            />
          </FormBlock>
          <input
            readOnly
            type="hidden"
            name="originCoordinates"
            value={JSON.stringify(originCoordinates)}
          />
          <input
            readOnly
            type="hidden"
            name="destinationCoordinates"
            value={JSON.stringify(destinationCoordinates)}
          />
          <DarkButton>Submit order</DarkButton>
        </Form>
      </div>
      <MapContainer center={[0, 0]} zoom={5} className={styles.mapContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Routing
          destinationPosition={destinationCoordinates}
          originPosition={originCoordinates}
          setDestinationName={setDestinationName}
          setOriginName={setOriginName}
          setDestinationCoordinates={setDestinationCoordinates}
          setOriginCoordinates={setOriginCoordinates}
          setPrice={setPrice}
          setDistance={setDistance}
        />
      </MapContainer>

      <Dialog open={actionData !== undefined}>
        <DialogTitle>Order Created</DialogTitle>
        <DialogContent>
          <Text>Your order has been successfully created!</Text>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateAnotherOrder} color="primary">
            Create Another Order
          </Button>
          <Button onClick={handleGoToDashboard} color="primary">
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormCreateOrder;
