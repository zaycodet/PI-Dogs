import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament } from "../../redux/actions";
import styles from "./FormPage.module.css";
import { Link } from "react-router-dom";

const FormPage = () => {
  const dispatch = useDispatch();
  const allTemperament = useSelector((state) => state.filteredTemperament);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (selectedOptions.length + selected.length <= 7) {
      setSelectedOptions((selectedOptions) => [
        ...new Set([...selectedOptions, ...selected]),
      ]);
    }
  };

  const handleRemoveOption = (valueToRemove) => {
    const updatedValues = selectedOptions.filter(
      (value) => value !== valueToRemove
    );
    setSelectedOptions(updatedValues);
  };

  const handleCreate = (dog) => {
    // Aquí puedes implementar la lógica para crear el perro en la base de datos local
    const newDog = {
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      lifeSpan: dog.life_span,
      image: dog.image.url,
      temperament: selectedOptions.join(", "), // Unir los temperamentos seleccionados
    };

    // Aquí puedes despachar una acción para guardar el nuevo perro en la base de datos local
    console.log("New dog:", newDog);
  };

  return (
    <div className={styles.containerForm}>
      <form>
        <div className={styles.containerTitle}>
          <h1>Create your dog!</h1>
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="Name">Name</label>
          <input name="Name" type="text" />
        </div>
        <div className={styles.containerRight}>
          <label htmlFor="Height">Height</label>
          <input name="Height" type="text" />
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="Weight">Weight</label>
          <input name="Weight" type="text" />
        </div>
        <div className={styles.containerRight}>
          <label htmlFor="Life Span">Life Span</label>
          <input name="Life Span" type="text" />
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="Image">Image</label>
          <input type="text" />
        </div>
        <div className={styles.containerRight}>
          <label>Temperament</label>
          <select multiple onChange={handleSelectChange}>
            {allTemperament.map((temp) => {
              return <option value={temp.name}>{temp.name}</option>;
            })}
          </select>
        </div>
        <div className={styles.containerOptionValue}>
          {selectedOptions.map((value, index) => (
            <h3
              key={index}
              style={{ color: "white", fontFamily: "Georgia" }}
            >
              {value}
              <span
                style={{
                  cursor: "pointer",
                  marginLeft: "7px",
                  marginRight: "6px",
                  color: "#596273",
                }}
                onClick={() => handleRemoveOption(value)}
              >
                x
              </span>
            </h3>
          ))}
        </div>
        <div className={styles.containerButtons}>
          <Link to="/home" className={styles.backButton}>
            Close
          </Link>
          <button className={styles.createButton} onClick={handleCreate}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
