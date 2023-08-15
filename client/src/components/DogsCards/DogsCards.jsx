import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderDogs } from "../../redux/actions/index";
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
    dispatch(orderDogs(e.target.value));
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
        <select>
          <option>Filter by origin</option>
          <option value="API">API Dogs</option>
          <option value="Database">DataBase Dogs</option>
        </select>
        <select onChange={handleOrder}>
          <option>Filter by order</option>
          <option value="A">Upward</option>
          <option value="D">Falling</option>
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
