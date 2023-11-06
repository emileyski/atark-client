import { FormSignUp } from "@Features/Authentication";
import { fetchUserData } from "@Features/User/userSlice";
import { redirect } from "react-router-dom";
import store from "src/store";

const SignUp = () => {
  return <FormSignUp />;
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

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
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    store.dispatch(fetchUserData());

    return redirect("/");
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export default SignUp;
