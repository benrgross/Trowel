const Axios = require("axios");

const router = require("express").Router();
// const trefleController = require("../../controllers/trefleController");
// const fetch = require("node-fetch");
require("dotenv").config();

// router.get("/", async (req, res) => {
//   const response = await fetch(
//     "https://trefle.io/api/v1/plants?token=$Gmg9IXKKoTDYSmtgxEG6-frzryOYamZfLPIncdW-LsU"
//   );
//   const json = await response.json();
//   console.log(res);
//   console.log(json);
// });
// config = {
//   token: process.env,
// };
// router.get(
//   `https://trefle.io/api/v1/plants?token=${config.token}&filter[common_name]=${query}`,
//   async (req, res) => {
//     const json = await res.json();
//     console.log(json);
//     console.log(res);
//   }
// );

// router.get("/api/searchCommon", async (req, res) => {
//   console.log(req.body.query);
//   var options = {
//     method: "GET",
//     url: `https://trefle.io/api/v1/plants?token=$Gmg9IXKKoTDYSmtgxEG6-frzryOYamZfLPIncdW-LsU&filter[common_name]=${req.body.query}`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   console.log(res);
//   const result = await res.json(result);
// });
const token = process.env.TOKEN_TREFLE;

router.post("/", async (req, res) => {
  console.log(req);

  // requesting data from 3rd party service
  try {
    // const object = {
    //   hello: "hello",
    // };
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/plants?token=${process.env.TOKEN_TREFLE}&filter[common_name]=${req.body}`
    );

    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
