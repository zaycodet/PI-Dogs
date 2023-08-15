import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import img from "../../Images/Logo.png";

const NavBar = () => {
  return (
    <div className={styles.containerNav}>
      <div className={styles.containerTitle}>
        <img className={styles.image} src={img} alt="Imagen" />
        <h1 className={styles.title}>Dogs Web</h1>
        <img className={styles.image} src={img} alt="Imagen" />
      </div>
      <div className={styles.containerButtons}>
        <div className={styles.buttonContainer}>
          <NavLink to="/form">
            <button className={styles.createDog}>Create Dog</button>
          </NavLink>
        </div>
        <div className={styles.buttonContainer}>
          <NavLink to="/">
            <button className={styles.exitPage}>Log Out</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
