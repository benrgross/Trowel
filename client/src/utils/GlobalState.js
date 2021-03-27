import React, { useReducer, createContext, useContext } from "react";
import {
  LOADING,
  LOGIN,
  LOGOUT,
  REMOVE_PLANT,
  REMOVE_ACCOUNT,
  RESULTS,
  SET_SAVED_PLANT,
  SET_SAVED_ACCOUNT,
  ADD_ACCOUNT,
  LOAD_ACCOUNTS,
  SPOTLIGHT,
  SAVE_TO_ACCOUNT,
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

    case LOAD_ACCOUNTS:
      return {
        ...state,
        accounts: [...action.accounts],
        loading: false,
      };

    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.account, ...state.accounts],
        loading: false,
      };

    case SET_SAVED_PLANT:
      console.log("action", action.saved);
      return {
        ...state,
        plants: action.saved,
        loading: false,
      };
    case SET_SAVED_ACCOUNT:
      return {
        ...state,
        account: action.account,
        loading: false,
      };

    case REMOVE_PLANT:
      return {
        ...state,
        plants: state.plants.filter((plant) => {
          return plant._id !== plant._id; // change to action._id
        }),
        loading: false,
      };
    case REMOVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((account) => {
          return account._id !== action._id;
        }),
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SAVE_TO_ACCOUNT:
      return {
        ...state,
        accountName: action.accountName,
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
            conspicuous: action.spotlight.flowerColor.conspicuous,
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
            deg_c: action.spotlight.maxTemp.deg_c,
          },
          minPh: action.spotlight.minPh,
          minPrecipitation: action.spotlight.minPrecipitation,
          minTemp: {
            deg_f: action.spotlight.minTemp.deg_f,
            deg_c: action.spotlight.minTemp.deg_c,
          },
          native: action.spotlight.native,
          scientificName: action.spotlight.scientificName,
          soilNutriments: action.spotlight.soilNutriments,
          soilTexture: action.spotlight.soilTexture,
          notes: "",
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
    account: {},
    accounts: [],
    accountName: "",
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
