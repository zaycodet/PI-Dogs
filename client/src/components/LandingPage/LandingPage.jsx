import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.containenLandingPage}>
      <h1 className={styles.title}>Welcome to the Dogs Web</h1>
      <NavLink to="/home">
        <button className={styles.buttonAccess}>🐺 Home 🐺</button>
      </NavLink>
    </div>
  );
};

export default LandingPage;
