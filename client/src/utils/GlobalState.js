import React, { useReducer, createContext, useContext } from "react";
import { LOADING, REMOVE_PLANT, RESULTS, SET_SAVED_PLANT } from "./actions";

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
    viewPlant: {}
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
