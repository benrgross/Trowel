import axios from "axios";
import proxy from "http-proxy-middleware";
export default {
  // Gets all posts
  getPlant: function () {
    return axios.get("/api/plants");
  },
  // Gets the post with the given id
  getPlant: function (id) {
    return axios.get("/api/plants/" + id);
  },
  // Deletes the post with the given id
  deletePlant: function (id) {
    return axios.delete("/api/plants/" + id);
  },
  // Saves a post to the database
  savePlant: function (plantData) {
    return axios.post("/api/plants", plantData);
  },

  searchPlantSpecies: function (query) {
    console.log(query);
    return axios.post(`/api/search/searchSpecies`, query);
  },

  searchPlantSpeciesPage: function (query) {
    console.log(query);
    return axios.post(`/api/search/searchSpecies/page`, query);
  },

  getAllPlants: function () {
    return axios.get(`/api/search/`);
  },
};
