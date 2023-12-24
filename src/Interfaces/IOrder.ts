import { IOrderStatus } from "./IOrderStatus";
import { ITariff } from "./ITariff";

export interface IOrder {
  id: number;
  origin: string;
  destination: string;
  weight: number;
  volume: number;
  price: number;
  cargoDescription: string;
  currentStatus: string;
  originCoordinates: {
    latitude: number;
    longitude: number;
  };
  destinationCoordinates: {
    latitude: number;
    longitude: number;
  };

  tariff?: ITariff;

  statuses?: IOrderStatus[];

  driver?: {
    id: string;
    name: string;
    createdAt: string;
    driverLicense: string;
  };

  customer?: {
    id: string;
    createdAt: string;
    name: string;
  };
}
