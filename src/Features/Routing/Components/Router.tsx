import AppLayout from "@Components/AppLayout/AppLayout";
import CreateOrder, { action as createOrderAction } from "@Pages/CreateOrder";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "@Pages/Dashboard";
import Home from "@Pages/Home/HomePage";
import SignIn, { action as signinAction } from "@Pages/SignIn";
import SignUp, { action as signupAction } from "@Pages/SignUp";
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
import UsersAdminPage, {
  loader as allUsersLoader,
} from "@Features/AdminPanel/Components/UsersAdminEditor";
import UserProfile from "@Pages/UserProfile";
import Complaints, { loader as complaintsLoader } from "@Pages/Complaints";
import TariffsAdminPage from "@Features/AdminPanel/Components/TariffsAdminEditor";
import AdminPanel from "@Pages/AdminPanel";
import OrdersAdminEditor from "@Features/AdminPanel/Components/OrdersAdminEditor";
import ComplaintsAdminEditor from "@Features/AdminPanel/Components/ComplaintsAdminEditor";
import DriversAdminEditor from "@Features/AdminPanel/Components/DriversAdminEditor";
import CustomersAdminPage from "@Features/AdminPanel/Components/CustomersAdminPage";
import UserList from "@Features/User/UserList";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "all-users",
        element: <UserList />,
      },
      {
        path: "create-order",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "customer-orders",
        element: <CustomerOrderList />,
        loader: customerOrderListLoader,
      },
      {
        path: "driver-orders",
        element: <DriverOrderList />,
        loader: driverOrderListLoader,
      },
      {
        path: "/app/profile",
        element: <UserProfile />,
      },
      {
        path: "available-orders",
        element: <AvailableOrders />,
        loader: availableOrdersLoader,
      },
      {
        path: "current-order",
        element: <CurrentOrder />,
        loader: currentOrderLoader,
      },
      {
        path: "complaints",
        element: <Complaints />,
        loader: complaintsLoader,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "users",
            element: <UsersAdminPage />,
            loader: allUsersLoader,
          },
          {
            path: "tariffs",
            element: <TariffsAdminPage />,
          },
          {
            path: "orders",
            element: <OrdersAdminEditor />,
          },
          {
            path: "complaints",
            element: <ComplaintsAdminEditor />,
          },
          {
            path: "drivers",
            element: <DriversAdminEditor />,
          },
          {
            path: "customers",
            element: <CustomersAdminPage />,
          },
        ],
      },
      {
        path: "signin",
        element: <SignIn />,
        action: signinAction,
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signupAction,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
