const Axios = require("axios");

const router = require("express").Router();

require("dotenv").config();

const token = process.env.TOKEN_TREFLE;

///get all plants from Trefle

router.get("/", async (req, res) => {
  console.log(req.body.query);

  try {
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/distributions/{zone_id}/plants?token=${token}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// get one plant by common name from query
router.post("/searchSpecies", async (req, res) => {
  console.log(req.body.query);

  try {
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/plants/search?token=${token}&q=${req.body.query}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/searchSpecies/page", async (req, res) => {
  console.log(req.body.page, req.body.query);

  try {
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/plants/search?token=${token}&q=${req.body.query}&page=${req.body.page}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
