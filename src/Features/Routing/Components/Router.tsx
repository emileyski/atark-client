import AppLayout from "@Components/AppLayout/AppLayout";
import CreateOrder, { action as createOrderAction } from "@Pages/CreateOrder";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "@Pages/Dashboard";
import Home from "@Pages/Home/HomePage";
import SignIn, { action as signinAction } from "@Pages/SignIn";
import SignUp, { action as signupAction } from "@Pages/SignUp";
import UserDashboard from "@Features/Dashboard/UserDashboard";
import CustomerOrderList, {
  loader as customerOrderListLoader,
} from "@Pages/CustomerOrderList";
import AvailableOrders, {
  loader as availableOrdersLoader,
} from "@Pages/AvailableOrders";
import CurrentOrder, {
  loader as currentOrderLoader,
} from "@Pages/CurrentOrder";
import DriverOrderList, {
  loader as driverOrderListLoader,
} from "@Pages/DriverOrderList";
import AllUsers, { loader as allUsersLoader } from "@Pages/AllUsers";
import UserProfile from "@Pages/UserProfile";
import Complaints, { loader as complaintsLoader } from "@Pages/Complaints";

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
      {
        path: "app/dashboard",
        element: <Dashboard />,
        children: [
          { path: "/app/dashboard/user", element: <UserDashboard /> },
          {
            path: "/app/dashboard/customer-orders",
            element: <CustomerOrderList />,
            loader: customerOrderListLoader,
          },
          {
            path: "/app/dashboard/driver-orders",
            element: <DriverOrderList />,
            loader: driverOrderListLoader,
          },
          {
            path: "/app/dashboard/available-orders",
            element: <AvailableOrders />,
            loader: availableOrdersLoader,
          },
          {
            path: "/app/dashboard/current-order",
            element: <CurrentOrder />,
            loader: currentOrderLoader,
          },
          {
            path: "/app/dashboard/all-users",
            element: <AllUsers />,
            loader: allUsersLoader,
          },
          {
            path: "/app/dashboard/profile",
            element: <UserProfile />,
          },
          {
            path: "/app/dashboard/complaints",
            element: <Complaints />,
            loader: complaintsLoader,
          },
        ],
      },
      { path: "/app/signin", element: <SignIn />, action: signinAction },
      { path: "/app/signup", element: <SignUp />, action: signupAction },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
