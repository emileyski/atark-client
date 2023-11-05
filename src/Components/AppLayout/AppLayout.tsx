import Header from "@Components/Header/Header";
import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Header />

      <div className={styles.container}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
