import axios from "axios";
import proxy from "http-proxy-middleware";
export default {
  // Gets all plants
  getPlant: function () {
    return axios.get("/api/plants");
  },
  // Gets the plant with the given id
  // getPlant: function (id) {
  //   return axios.get("/api/plants/" + id);
  // },
  // Deletes the plant with the given id
  deletePlant: function (id) {
    return axios.delete("/api/plants/" + id);
  },
  // Saves a plant to the database
  savePlant: function (plantData) {
    return axios.post("/api/plants", plantData);
  },
  
  // Saves a account to the database
  saveAccount: function (accountData) {
    return axios.post("/api/accounts", accountData);
  },

  // Get accounts from database
  getAccounts: function (accountData) {
    return axios.get("/api/accounts", accountData);
  },

  searchPlantSpecies: function (query) {
    console.log(query);
    return axios.post(`/api/search/searchSpecies`, query);
  },

  searchPlants: function (query) {
    console.log(query);
    return axios.post(`/api/search/searchPlants`, query);
  },

  searchPlantSpeciesPage: function (query) {
    console.log(query);
    return axios.post(`/api/search/searchSpecies/page`, query);
  },

  getAllPlants: function () {
    return axios.get(`/api/search/`);
  },

  getPlant: function (item) {
    return axios.post(`/api/search/plant`, item);
  },
};
