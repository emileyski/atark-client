import Home from "@Pages/HomePage";
import SignIn from "@Pages/SignIn";
import SignUp, { action as signupAction } from "@Pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp />, action: signupAction },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
