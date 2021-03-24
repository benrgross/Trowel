import React, { useReducer, createContext, useContext } from "react";
import { LOADING, REMOVE_PLANT, RESULTS, SET_SAVED_PLANT, SPOTLIGHT } from "./actions";

// Don't forget to import all of your actions!
const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case RESULTS:
      return {
        ...state,
        results: action.results,
        loading: false,
      };
    case SET_SAVED_PLANT:
      console.log("action", action.saved);
      return {
        ...state,
        books: action.saved,
        loading: false,
      };

    case REMOVE_PLANT:
      return {
        ...state,
        books: state.books.filter((book) => {
          return book._id !== action._id;
        }),
        lading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SPOTLIGHT:
      return {
        ...state,
        viewPlant: {
          commonName: action.spotlight.commonName,
          scientificName: action.spotlight.scientificName,
          img: action.spotlight.img
        },
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    plants: [{}],
    plant: {},
    results: [{}],
    loading: false,
    viewPlant: {
      commonName: "Plant Example",
      scientificName: "Science Plant",
      img: "https://images.pexels.com/photos/3209811/pexels-photo-3209811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    }
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
