import React, { Fragment } from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { AiOutlineHistory } from "react-icons/ai";

export const Sidebar = () => {
  // TODO: Add actions for links
  // TODO: create backend API
  return (
    <Fragment>
      <aside className={styles["sidebar"]}>
        <nav className={styles["sidebar__nav"]}>
          <li className={styles["sidebar__nav__list"]}>
            <NavLink to="#" className={styles["sidebar__nav__list__link"]}>
              <span className={styles["sidebar__nav__list__link--icon"]}>
                <IconContext.Provider
                  value={{
                    size: "2rem",
                  }}
                >
                  <BsPersonPlus />
                </IconContext.Provider>
              </span>
              <span className={styles["sidebar__nav__list__link--text"]}>
                Add student
              </span>
            </NavLink>
          </li>
          <li className={styles["sidebar__nav__list"]}>
            <NavLink to="#" className={styles["sidebar__nav__list__link"]}>
              <span className={styles["sidebar__nav__list__link--icon"]}>
                <IconContext.Provider
                  value={{
                    size: "2rem",
                  }}
                >
                  <MdOutlineOnlinePrediction />
                </IconContext.Provider>
              </span>
              <span className={styles["sidebar__nav__list__link--text"]}>
                Predict
              </span>
            </NavLink>
          </li>
          <li className={styles["sidebar__nav__list"]}>
            <NavLink to="#" className={styles["sidebar__nav__list__link"]}>
              <span className={styles["sidebar__nav__list__link--icon"]}>
                <IconContext.Provider
                  value={{
                    size: "2rem",
                  }}
                >
                  <RiGroupLine />
                </IconContext.Provider>
              </span>
              <span className={styles["sidebar__nav__list__link--text"]}>
                Students
              </span>
            </NavLink>
          </li>
          <li className={styles["sidebar__nav__list"]}>
            <NavLink to="#" className={styles["sidebar__nav__list__link"]}>
              <span className={styles["sidebar__nav__list__link--icon"]}>
                <IconContext.Provider
                  value={{
                    size: "2rem",
                  }}
                >
                  <AiOutlineHistory />
                </IconContext.Provider>
              </span>
              <span className={styles["sidebar__nav__list__link--text"]}>
                Activity
              </span>
            </NavLink>
          </li>
        </nav>
        <footer className={styles["sidebar__footer"]}>
          &copy; CodePile {new Date().getFullYear()}
        </footer>
      </aside>
    </Fragment>
  );
};
