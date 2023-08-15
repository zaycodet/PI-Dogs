/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./DogCard.module.css";

const DogCard = ({ id, name, image, temperament, weight }) => {
  return (
    <NavLink to={`/dogs/${id}`} className={styles.linkCard}>
      <div className={styles.containerCard}>
        <h1>{name}</h1>
        <img src={image} className={styles.image} alt="Dog Image"></img>
        <h2>Temperaments: {temperament}</h2>
        <h2>
          Weight: {weight.imperial} / {weight.metric}
        </h2>
      </div>
    </NavLink>
  );
};

export default DogCard;
