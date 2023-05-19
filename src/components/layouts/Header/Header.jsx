import React, { Fragment } from "react";
import styles from "./Header.module.scss";
import { IconContext } from "react-icons";
import { IoMenuOutline } from "react-icons/io5";
// import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export const Header = () => {
  return (
    <Fragment>
      <header className={styles["header"]}>
        <div className={styles["header__logo-container"]}>
          <span className={styles["header__logo-container__menu-icon"]}>
            <IconContext.Provider
              value={{
                size: "2rem",
              }}
            >
              <IoMenuOutline />
            </IconContext.Provider>
          </span>
          <span className={styles["header__logo-container__logo"]}>
            CodePile
          </span>
        </div>
        <div className="header__person-container">
          <span className={styles["header__person-container__person-icon"]}>
            <IconContext.Provider
              value={{
                size: "4.8rem",
                style: { marginBottom: "-1.2rem" },
              }}
            >
              <IoPersonCircleSharp />
            </IconContext.Provider>
          </span>
          <span className={styles["header__person-container__logout-icon"]}>
            <IconContext.Provider
              value={{
                size: "2rem",
                // style: { marginTop: "-8rem" },
              }}
            >
              <MdLogout />
            </IconContext.Provider>
          </span>
        </div>
      </header>
    </Fragment>
  );
};
