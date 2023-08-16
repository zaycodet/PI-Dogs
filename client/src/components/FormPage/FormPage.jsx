import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, createDog } from "../../redux/actions";
import validations from "./validations";
import styles from "./FormPage.module.css";

const FormPage = () => {
  const [dataDog, setDataDog] = useState({
    image: "",
    name: "",
    weight: "",
    height: "",
    life_span: "",
    temperaments: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errors, setErrors] = useState({});


  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperament = useSelector((state) => state.filteredTemperament);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (selectedOptions.length + selected.length <= 7) {
      setSelectedOptions((selectedOptions) => [
        ...new Set([...selectedOptions, ...selected]),
      ]);

      setDataDog((prevData) => ({
        ...prevData,
        temperaments: [...new Set([...prevData.temperaments, ...selected])],
      }));
    }
  };

  const handleRemoveOption = (valueToRemove) => {
    const updatedValues = selectedOptions.filter(
      (value) => value !== valueToRemove
    );
    setSelectedOptions(updatedValues);
  };

  const handleChange = (event) => {
    setDataDog((dataDog) => ({
      ...dataDog,
      [event.target.name]: event.target.value,
    }));
    setErrors(
      validations({ ...dataDog, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors.length > 0) {
      alert("Fix create");
    } else {
      dispatch(createDog(dataDog));
      alert("Create Dog");
      setDataDog({
        image: "",
        name: "",
        weight: "",
        height: "",
        life_span: "",
        temperaments: "",
      });
      history.push("/home");
    }
  };


  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.containerTitle}>
          <h1>Create your own dog!</h1>
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={dataDog.name}
            onChange={handleChange}
            placeholder="Insert name..."
          />
          {errors.name ? <p className={styles.errorMessage}>{errors.name}</p> : null}
        </div>
        <div className={styles.containerRight}>
          <label htmlFor="height">Height</label>
          <input
            name="height"
            type="text"
            value={dataDog.height}
            onChange={handleChange}
            placeholder="Insert height..."
          />
          {errors.height && <p className={styles.errorMessage}>{errors.height}</p>}
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="weight">Weight</label>
          <input
            name="weight"
            type="text"
            value={dataDog.weight}
            onChange={handleChange}
            placeholder="Insert weight..."
          />
          {errors.weight && <p className={styles.errorMessage}>{errors.weight}</p>}
        </div>
        <div className={styles.containerRight}>
          <label htmlFor="life_span">Life Span</label>
          <input
            name="life_span"
            type="text"
            value={dataDog.life_span}
            onChange={handleChange}
            placeholder="Insert life span..."
          />
          {errors.life_span && <p className={styles.errorMessage}>{errors.life_span}</p>}
        </div>
        <div className={styles.containerLeft}>
          <label htmlFor="image">Image</label>
          <input
            name="image"
            type="text"
            value={dataDog.image}
            onChange={handleChange}
            placeholder="Insert image url..."
          />
          {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
        </div>
        <div className={styles.containerTemperaments}>
          <label>Temperaments</label>
          <select multiple onChange={handleSelectChange}>
            {allTemperament.map((temp) => {
              return <option value={temp.name}>{temp.name}</option>;
            })}
          </select>
          {errors.temperament && <p className={styles.errorMessage}>{errors.temperament}</p>}
        </div>
        <div className={styles.containerOptionValue}>
          {selectedOptions.map((value, index) => (
            <h3 key={index}>
              {value}
              <span
                style={{ cursor: "pointer", marginLeft: "5px", color: "#7D4E57" }}
                onClick={() => handleRemoveOption(value)}
              >
                X
              </span>
            </h3>
          ))}
        </div>
        <button className={styles.createButton} type="submit">Create</button>
        <button onClick={() => history.push("/home")} className={styles.closeButton}>Close</button>
      </form>
    </div>
  );
};

export default FormPage;
