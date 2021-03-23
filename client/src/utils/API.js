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

  searchPlantCommon: function (query) {
    console.log(query);
    return axios.post(`/api/search/`, query);
  },

  // searchPlantCommon: function async() {
  //   return axios.get(
  //     proxy("/api", {
  //       target:
  //         "https://trefle.io/api/v1/plants?token=$Gmg9IXKKoTDYSmtgxEG6-frzryOYamZfLPIncdW-LsU",
  //       logLevel: "debug",
  //       changeOrigin: true,
  //     })
  //   );
  // },

  // searchPlantCommon: function async() {
  //   return axios.get(
  //     "https://trefle.io/api/v1/plants?token=$Gmg9IXKKoTDYSmtgxEG6-frzryOYamZfLPIncdW-LsU",
  //     {
  //       method: "GET",
  //       mode: "no-cors",
  //       //   headers: [
  //       //     ["Content-Type", "application/csp-report"],
  //       //     ["Content-Type", "application/expect-ct-report+json"],
  //       //     ["Content-Type", "application/xss-auditor-report"],
  //       //     ["Content-Type", "application/ocsp-request"],
  //       //   ],
  //     }
  //   );
  // },
};
