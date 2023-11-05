import { Router } from "@Features/Routing";
import "./assets/styles/global.scss";
import { useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@Features/User/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(fetchUserData());
      // if (!userData) navigate("/login");
    },
    [dispatch]
  );

  return <Router />;
}

export default App;
