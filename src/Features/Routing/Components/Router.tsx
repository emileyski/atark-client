import AppLayout from "@Components/AppLayout/AppLayout";
import CreateOrder, { action as createOrderAction } from "@Pages/CreateOrder";
import Home from "@Pages/Home/HomePage";
import SignIn from "@Pages/SignIn";
import SignUp, { action as signupAction } from "@Pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/app/create-order",
        element: <CreateOrder />,
        action: createOrderAction,
      },

      { path: "/app/signin", element: <SignIn /> },
      { path: "/app/signup", element: <SignUp />, action: signupAction },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
