import React, { useEffect } from "react";
import { useParams , useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogById } from "../../redux/actions";
import styles from "./DogDetails.module.css";

const DogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const characterDog = useSelector((state) => state.characterDog);

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  console.log("Character Dog:", characterDog[0]);

  const handleClose = () => {
    history.goBack(); // Función para volver atrás en el historial
  };

  return (
    <div className={styles.containerDetails}>
      {characterDog[0] ? (
        <div className={styles.detailsCard}>
          <h1>{characterDog[0].name}</h1>
          <img src={characterDog[0]?.image.url} alt="Dog" />
          <h2>Life Span: {characterDog[0].life_span}</h2>
          <h2>Temperament: {characterDog[0].temperament}</h2>
          <h2>
            Weight: {characterDog[0]?.weight.metric} kg
          </h2>
          <h2>
            Height: {characterDog[0]?.height.metric} cm
          </h2>
          <button className={styles.goBackButton} onClick={handleClose}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DogDetails;
