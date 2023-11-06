import { FunctionComponent } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.user.userData);

  return (
    <header className={styles.header}>
      <div className={styles.collapseNavbarCollapse}>
        <div className={styles.navbarNav}>
          {!userData ? (
            <>
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
            </>
          ) : (
            <>
              {userData && userData.role === "customer" && (
                <button
                  onClick={() => navigate("/app/create-order")}
                  className={styles.btnText}
                >
                  Create order
                </button>
              )}
              {userData && (
                <button
                  onClick={() => navigate("/app/dashboard/profile")}
                  className={styles.buttonbtnprimaryColor}
                >
                  <b className={styles.btnText1}>
                    {userData.name}, to profile ({userData.role})
                  </b>
                  <img
                    className={styles.icnArrowRightIcnXs}
                    alt=""
                    src="/icn-arrowright-icnxs.svg"
                  />
                </button>
              )}
            </>
          )}
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
