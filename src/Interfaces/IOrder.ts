import { IOrderStatus } from "./IOrderStatus";

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

  statuses?: IOrderStatus[];
}
