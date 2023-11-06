import FormCreateOrder from "@Features/Order/Components/FormCreateOrder";
import getAxiosInstance from "src/api/interceptors";

export default function CreateOrder() {
  return <FormCreateOrder />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  data.volume = Number(data.volume);
  data.weight = Number(data.weight);
  data.tariffId = Number(data.tariffId);

  try {
    const resp = await getAxiosInstance(import.meta.env.VITE_APP_API_URL).post(
      "/orders",
      {
        ...data,
        originCoordinates: JSON.parse(data.originCoordinates),
        destinationCoordinates: JSON.parse(data.destinationCoordinates),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status === 201) {
      return { orderCreatedData: resp.data };
    } else {
      throw new Error("Order not created");
    }
  } catch (error) {
    return null;
  }
}
