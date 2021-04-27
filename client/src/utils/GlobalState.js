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
  SHOW_FORM,
  ALERT,
  VIEW_ACCOUNT_NOTES,
  CHANGE_NOTES,
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
        accounts: action.accounts,
        loading: false,
      };

    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...action.account, state.accounts],
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
        account: {
          ...state.account,
          plants: state.account.plants.filter((plant) => {
            return plant._id !== action.plantID;
          }),
        },
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

    case SHOW_FORM:
      return {
        ...state,
        display: action.display,
      };

    case ALERT:
      return {
        ...state,
        message: action.message,
      };

    case SAVE_TO_ACCOUNT:
      return {
        ...state,
        accountName: action.accountName,
      };

    case CHANGE_NOTES:
      return {
        ...state,
        viewPlant: {
          ...state.viewPlant,
          notes: action.newNote,
        },
      };

    case VIEW_ACCOUNT_NOTES:
      return {
        ...state,
        accountID: action.accountID,
      };

    case SPOTLIGHT:
      return {
        ...state,
        switch: action.switch,
        viewPlant: {
          id: action.spotlight.id,
          url: action.url,
          atmosHumidity: action.spotlight.atmosHumidity,
          bloomMonths: action.spotlight.bloomMonths,
          commonName: action.spotlight.commonName,
          scientificName: action.spotlight.scientificName,
          edible: action.spotlight.edible,
          family: action.spotlight.family,
          familyCommonName: action.spotlight.familyCommonName,
          flowerColor: {
            color: action.spotlight.flowerColor.color,
            conspicuous: action.spotlight.flowerColor.conspicuous,
          },
          genus: action.spotlight.genus,
          growthHabit: action.spotlight.growthHabit,
          growthRate: action.spotlight.growthRate,
          growthForm: action.spotlight.growthForm,
          heightAvgCm: action.spotlight.heightAvgCm,
          img: action.spotlight.img,
          light: action.spotlight.light,
          maxPh: action.spotlight.maxPh,
          maxPrecipitation: action.spotlight.maxPrecipitation,
          maxTemp: action.spotlight.maxTemp,
          minPh: action.spotlight.minPh,
          minPrecipitation: action.spotlight.minPrecipitation,
          minTemp: action.spotlight.minTemp,
          native: action.spotlight.native,
          soilNutriments: action.spotlight.soilNutriments,
          soilTexture: action.spotlight.soilTexture,
          soilHumidity: action.spotlight.soilHumidity,
          lightCondition: action.lightCondition,
          notes: action.spotlight.notes,
          notesDate: action.spotlight.notesDate,
        },
      };
    case LOGIN:
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
    results: [],
    pageLinks: [],
    page: 1,
    loading: false,
    userToken: "",
    email: "",
    user: {},
    switch: true,
    display: false,
    message: "",
    account: {},
    accounts: [],
    accountName: "",
    accountID: "",
    viewPlant: {},
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
