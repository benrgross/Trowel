import axios from "axios";

export default {
  // Gets all plants
  getPlants: function () {
    return axios.get("/api/plants");
  },

  // Gets the plant with the given id
  getPlant: function (account) {
    return axios.post("/api/plants/", account);
  },

  // Deletes the plant with the given id
  deletePlant: function (id) {
    return axios.delete("/api/plants/" + id);
  },

  // Saves a plant to the database
  savePlant: function (plantData) {
    return axios.post("/api/plants", plantData);
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

  searchPage: function (query) {
    return axios.post(`api/search/searchPage`, query);
  },

  login: function (cred) {
    return axios.post("/api/auth/login", cred);
  },
  signUp: function (cred) {
    return axios.post("/api/auth/register", cred);
  },

  // Saves a account to the database

  saveAccount: function (accountData) {
    return axios.post("/api/accounts", accountData);
  },

  // Get accounts from database
  getAccounts: function (accountData) {
    return axios.get("/api/accounts", accountData);
  },

  addPlantToAccount: function (savePlant) {
    return axios.post("/api/accounts/addPlantToAccount", savePlant);
  },

  updateAccount: function (accountID, plantID) {
    return axios.post(`/api/accounts/deletePlant/${accountID}`, { id: plantID });
  },

  findAccout: function (query) {
    return axios.post("/api/accounts/findAccount", query);
  },

  findAccountById: function (id) {
    return axios.get(`/api/accounts/` + id);
  },

  deleteAccount: function (id) {
    return axios.delete("/api/accounts/" + id);
  },

  getPlantsByAccount: function (query) {
    return axios.post("/api/accounts/getPlants", query);
  },

  findNewAccount: function (query) {
    return axios.get("/api/accounts/findNewAccount", query);
  },
};
