import { 
  GETDOGS,
  GETDOGBYID,
  GETDOGSBYNAME,
  GETTEMPERAMENT,
  FILTERTEMPERAMENT,
  ORDER,
  CREATEDOG,
  ORDERWEIGHT_ASC,
  ORDERWEIGHT_DES,
  FILTER_API,
  FILTER_BD,
 } from "../actions/types";

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
    case FILTERTEMPERAMENT:
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
    case ORDERWEIGHT_ASC:
      const sortedByWeightAsc = [...state.charactersDogs].sort(
        (a, b) => parseFloat(a.weight.metric) - parseFloat(b.weight.metric)
      );
      return {
        ...state,
        charactersDogs: sortedByWeightAsc,
        filteredDogs: sortedByWeightAsc,
      };
    case ORDERWEIGHT_DES:
      const sortedByWeightDesc = [...state.charactersDogs].sort(
        (a, b) => parseFloat(b.weight.metric) - parseFloat(a.weight.metric)
      );
      return {
        ...state,
        charactersDogs: sortedByWeightDesc,
        filteredDogs: sortedByWeightDesc,
      };
    case CREATEDOG: 
    return{
      ...state,
    };
    case FILTER_API:
      if (Array.isArray(state.allDogs)) {
        const allDogs1 = [...state.allDogs];
        return {
          ...state,
          showDogs: allDogs1.filter((dog) => typeof dog.id === "number"), //id de la api es num entero
        };
      } else {
        return state;
      }
    case FILTER_BD:
      if (Array.isArray(state.allDogs)) {
        const allDogs2 = [...state.allDogs];
        return {
          showDogs: allDogs2.filter((dog) =>
            /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/.test(
              dog.id
            )
          ),
        };
      } else {
        return state;
      }
    default:
      return { ...state };
  }
};

export default rootReducer;