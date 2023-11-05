import { FormSignUp } from "@Features/Authentication";
import { redirect } from "react-router-dom";

const SignUp = () => {
  return <FormSignUp />;
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);

  const responce = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  try {
    const data = await responce.json();
    console.log(data);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return redirect("/");
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export default SignUp;
