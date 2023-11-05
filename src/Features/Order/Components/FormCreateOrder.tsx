// FormCreateOrder.tsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./FormCreateOrder.module.css"; // Модульные стили
import { Form, FormBlock, FormContainer } from "@Components/Form";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { DarkButton } from "@Components/UI/Buttons";
import Routing from "@Components/UI/Routing";

const FormCreateOrder: React.FC = () => {
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
            <Input type="text" name="tariffId" placeholder="TariffId" />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Distance</Text>
            <Input
              type="text"
              name="tariffId"
              placeholder="This field will calculated"
            />
          </FormBlock>
          <FormBlock>
            <Text color="#808080">Estimated price</Text>
            <Input
              type="text"
              name="tariffId"
              placeholder="This field will calculated"
            />
          </FormBlock>
          <input
            type="hidden"
            name="originCoordinates"
            value={JSON.stringify(originCoordinates)}
          />
          <input
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
        />
      </MapContainer>
    </div>
  );
};

export default FormCreateOrder;
