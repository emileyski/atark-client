import OrderList from "@Features/Order/Components/OrderList";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { IOrder } from "src/Interfaces/IOrder";
import getAxiosInstance from "src/api/interceptors";

const DriverOrderList: React.FC = () => {
  const orders: IOrder[] = useLoaderData() as IOrder[];

  return <OrderList orders={orders} />;
};

export async function loader() {
  const responce = await getAxiosInstance(import.meta.env.VITE_APP_API_URL).get(
    "/orders/as-driver"
  );

  if (responce.status === 200) {
    return responce.data;
  } else {
    return [];
  }
}

export default DriverOrderList;
