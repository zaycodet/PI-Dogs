import { GETDOGS, GETDOGBYID, GETDOGSBYNAME, GETTEMPERAMENT, FILTEREDTEMPERAMENT, ORDER } from "../actions/types";

const initialState = {
  charactersDogs: [],
  characterDog: [],
  filteredDogs: [],
  filteredTemperament: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETDOGS:
      return {
        ...state,
        charactersDogs: action.payload,
      };
    case GETDOGBYID:
      return {
        ...state,
        characterDog: action.payload,
      };
    case GETDOGSBYNAME:
      const searchTerm = action.payload;
      const searchResults = state.charactersDogs.filter((dog) =>
        searchTerm.some(
          (searchItem) =>
            dog.name &&
            searchItem.name &&
            dog.name.toLowerCase().includes(searchItem.name.toLowerCase())
        )
      );
      return {
        ...state,
        filteredDogs: searchResults,
      };
    case GETTEMPERAMENT:
      return {
        ...state,
        filteredTemperament: action.payload,
      };
    case FILTEREDTEMPERAMENT:
      return {
        ...state,
        filteredDogs: action.payload,
      };
    case ORDER:
      const allCharactersFavCopy = [...state.charactersDogs];

      const sortedCharacters =
        action.payload === "A"
          ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
          : allCharactersFavCopy.sort((a, b) => b.id - a.id);
      return {
        ...state,
        charactersDogs: sortedCharacters,
        filteredDogs: sortedCharacters,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
