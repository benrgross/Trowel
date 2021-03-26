import React, { useReducer, createContext, useContext } from "react";
import {
  LOADING,
  LOGIN,
  LOGOUT,
  REMOVE_PLANT,
  RESULTS,
  SET_SAVED_PLANT,
  SPOTLIGHT,
} from "./actions";

// Don't forget to import all of your actions!
const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case RESULTS:
      return {
        ...state,
        results: action.results,
        pageLinks: action.pageLinks,
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
          atmosHumidity: action.spotlight.atmosHumidity,
          bloomMonths: action.spotlight.bloomMonths,
          commonName: action.spotlight.commonName,
          edible: action.spotlight.edible,
          family: action.spotlight.family,
          familyCommonName: action.spotlight.familyCommonName,
          flowerColor: {
            color: action.spotlight.flowerColor.color,
            conspicuous: action.spotlight.flowerColor.conspicuous
          },
          genus: action.spotlight.genus,
          growthHabit: action.spotlight.growthHabit,
          heightAvgCm: action.spotlight.heightAvgCm,
          img: action.spotlight.img,
          light: action.spotlight.light,
          maxPh: action.spotlight.maxPh,
          maxPrecipitation: action.spotlight.maxPrecipitation,
          maxTemp: {
            deg_f: action.spotlight.maxTemp.deg_f,
            deg_c: action.spotlight.maxTemp.deg_c
          },
          minPh: action.spotlight.minPh,
          minPrecipitation: action.spotlight.minPrecipitation,
          minTemp: {
            deg_f: action.spotlight.minTemp.deg_f,
            deg_c: action.spotlight.minTemp.deg_c
          },
          native: action.spotlight.native,
          scientificName: action.spotlight.scientificName,
          soilNutriments: action.spotlight.soilNutriments,
          soilTexture: action.spotlight.soilTexture,
          notes: ""
        },
      };
    case LOGIN:
      console.log(action.token);
      return {
        ...state,
        email: action.email,
        userToken: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: "",
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
    pageLinks: [],
    page: 1,
    loading: false,
    userToken: "",
    email: "",
    user: {},
    viewPlant: {
      commonName: "Plant Example",
      scientificName: "Science Plant",
      img:
        "https://images.pexels.com/photos/3209811/pexels-photo-3209811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
