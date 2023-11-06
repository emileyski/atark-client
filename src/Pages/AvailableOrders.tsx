import React from "react";
import getAxiosInstance from "src/api/interceptors";

import { useLoaderData } from "react-router-dom";
import { IOrder } from "src/Interfaces/IOrder";
import OrderList from "@Features/Order/Components/OrderList";

const AvailableOrders: React.FC = () => {
  const orders: IOrder[] = useLoaderData() as IOrder[];

  return <OrderList orders={orders} />;
};

export async function loader() {
  const responce = await getAxiosInstance(import.meta.env.VITE_APP_API_URL).get(
    "/orders/available"
  );

  if (responce.status === 200) {
    return responce.data;
  } else {
    return [];
  }
}

export default AvailableOrders;
