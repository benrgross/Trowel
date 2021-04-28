const Axios = require("axios");

const router = require("express").Router();

require("dotenv").config();

const token = process.env.TOKEN_TREFLE;

///get all plants from Trefle
router.get("/", async (req, res) => {
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
      `https://trefle.io/api/v1/species/search?token=${token}&q=${req.body.query}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// query species rout
router.post("/searchPlants", async (req, res) => {
  try {
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/plants/search?token=${token}&q=${req.body.query}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/searchPlants", async (req, res) => {
  console.log(req.body.page, req.body.query);

  try {
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/plants/search?token=${token}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/searchPlants", async (req, res) => {
//   try {
//     const { data } = await Axios.get(
//       `https://trefle.io/api/v1/species/search?token=${token}`
//     );

//     res.json(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/searchPage", async (req, res) => {
  try {
    const { data } = await Axios.get(
      `https://trefle.io/api/v1/plants/search?token=${token}&page=${req.body.page}&q=${req.body.query}`
    );

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// get single plant info with url from searchSpecies
router.post("/plant", async (req, res) => {
  try {
    const { data } = await Axios.get(
      `https://trefle.io${req.body.url}?token=${token}`
    );
    console.log(data);
    const { growth } = data.data;
    console.log("growth", growth);

    const { specifications } = data.data;

    if (growth.maximum_temperature.deg_f == null) {
      growth.maximum_temperature = null;
    } else
      growth.growth.maximum_temperature = growth.maximum_temperature["deg_f"];

    if (growth.minimum_temperature.deg_f == null) {
      growth.minimum_temperature = null;
    } else growth.minimum_temperature = growth.minimum_temperature["deg_f"];

    const plantData = {
      images: data.data.images,
      url: data.data.links["self"],
      image: data.data.image_url,
      commonName: data.data.common_name,
      scientificName: data.data.scientific_name,
      family: data.data.family,
      familyCommonName: data.data.family_common_name,
      genus: data.data.genus,
      native: data.data.distribution["native"],
      edible: data.data.edible,
      family: data.data.family,
      flowerColor: data.data.flower,
      light: growth.light,
      atmosHumidity: growth.atmospheric_humidity,
      bloomMonths: growth.bloom_months,
      minPrecipitation: growth.minimum_precipitation,
      maxPrecipitation: growth.minimum_precipitation,
      minTemp: growth.minimum_temperature,
      maxTemp: growth.maximum_temperature,
      maxPh: growth.ph_maximum,
      minPh: growth.ph_minimum,
      soilNutriments: growth.soil_nutriments,
      soilTexture: growth.soil_texture,
      soilHumidity: growth.soil_humidity,
      heightAvg: specifications.average_height,
      growthHabit: specifications.growth_habit,
      growthRate: specifications.growth_rate,
      growthForm: specifications.growth_form,
    };

    res.json(plantData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
