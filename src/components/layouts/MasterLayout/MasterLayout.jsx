import React, { Fragment } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./MasterLayout.module.scss";

export const MasterLayout = (props) => {
  return (
    <Fragment>
      <div className={styles["master-layout"]}>
        <div className={styles["master-layout__header"]}>
          <Header />
        </div>
        <div className={styles["master-layout__sidebar-main"]}>
          <Sidebar />
          <main className={styles["master-layout__sidebar-main__main"]}>
            {props.children}
          </main>
        </div>
      </div>
    </Fragment>
  );
};
