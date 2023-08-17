import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderDogs, orderWeightAsc, orderWeightDes, filterApi, filterBD } from "../../redux/actions/index";
import styles from "./DogsCards.module.css";
import DogCard from "../DogCard/DogCard";
import FilterTemperament from "../FilterTemperament/FilterTemperament";

const itemsPerPage = 8;

const DogsCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.charactersDogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar la página cuando cambia el término de búsqueda
  };

  const dogsToDisplay = filteredDogs.length > 0 ? filteredDogs : allCharacters;

  // Filtrar los perros basado en el término de búsqueda
  const filteredAndSearchedDogs = dogsToDisplay.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const current = filteredAndSearchedDogs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAndSearchedDogs.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOrder = (e) => {
    const orderType = e.target.value;

    if (orderType === "A") {
      dispatch(orderDogs("A")); // Orden alfabético ascendente
    } else if (orderType === "D") {
      dispatch(orderDogs("D")); // Orden alfabético descendente
    } else if (orderType === "WA") {
      dispatch(orderWeightAsc()); // Orden por peso ascendente
    } else if (orderType === "WD") {
      dispatch(orderWeightDes()); // Orden por peso descendente
    }
  };

  const handleOrigin = (value, dispatch, setCurrentPage) => {
    if (value === "API") {
      dispatch(filterApi());
    }
    if (value === "BD") {
      dispatch(filterBD());
    }
    if (value === "All") {
      dispatch(getDogs());
    }
  };

  return (
    <div className={styles.containerCards}>
      <div className={styles.containerSelect}>
        <input
          type="text"
          className={styles.searchBar}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search dog by name..."
        />
        <FilterTemperament />
        <select onChange={handleOrder}>
          <option>Filter by order</option>
          <option value="A">Name (Asc)</option>
          <option value="D">Name (Desc)</option>
          <option value="WA">Weight (Asc)</option>
          <option value="WD">Weight (Desc)</option>
        </select>
        <select onChange={handleOrigin}>
            <option value="default" hidden>
              Data source
            </option>
            <option value="All">All Dogs</option>
            <option value="API">API Dogs</option>
            <option value="BD">DB Dogs</option>
          </select>
      </div>
      <div className={styles.cards}>
        {current?.map((data) => {
          return (
            <DogCard
              id={data.id}
              name={data.name}
              image={data.image.url}
              temperament={data.temperament}
              weight={data.weight}
            />
          );
        })}
      </div>
      <div className={styles.containerPaginated}>
        <button
          className={styles.buttonPrev}
          onClick={prevPage}
          disabled={currentPage === 1}
        ></button>
        <span className={styles.currentPage}>
          {currentPage} of {totalPages}
        </span>
        <button
          className={styles.buttonNext}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        ></button>
      </div>
    </div>
  );
};

export default DogsCards;
