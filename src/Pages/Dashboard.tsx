import React from "react";
// import { useSelector } from "react-redux";
// import { IUser } from "src/Interfaces/IUser";
import { Outlet } from "react-router-dom";

// interface IRootState {
//   user: { userData: IUser };
// }

const Dashboard: React.FC = () => {
  // const userRole = useSelector((state: IRootState) => state.user.userData.role);

  return <Outlet />;
};

export default Dashboard;
