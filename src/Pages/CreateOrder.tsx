import FormCreateOrder from "@Features/Order/Components/FormCreateOrder";

export default function CreateOrder() {
  return <FormCreateOrder />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  data.volume = Number(data.volume);
  data.weight = Number(data.weight);
  data.tariffId = Number(data.tariffId);

  console.log(data);

  return null;
}
