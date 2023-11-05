import { FunctionComponent } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.collapseNavbarCollapse}>
        <div className={styles.navbarNav}>
          <button
            onClick={() => navigate("/app/signin")}
            className={styles.btnText}
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/app/signup")}
            className={styles.buttonbtnprimaryColor}
          >
            <b className={styles.btnText1}>Sign Up</b>
            <img
              className={styles.icnArrowRightIcnXs}
              alt=""
              src="/icn-arrowright-icnxs.svg"
            />
          </button>
        </div>
      </div>
      <img
        onClick={() => navigate("/")}
        className={styles.icon}
        alt=""
        src="/-2-1@2x.png"
      />
    </header>
  );
};

export default Header;
