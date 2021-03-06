const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  commonName: { type: String, required: false },
  scientificName: { type: String, required: false },
  flowerColor: {
    color: [String],
    conspicuous: Boolean,
  },
  minTemp: Number,
  maxTemp: Number,
  native: [String],
  bloomMonths: [String],
  notes: String,
  distZone: String,
  family: String,
  familyCommonName: String,
  genus: String,
  family: String,
  growthHabit: String,
  growthForm: String,
  growthRate: String,
  shape: String,
  light: Number,
  atmosHumidity: Number,
  minPrecipitation: Number,
  maxPrecipitation: Number,
  maxPh: Number,
  minPh: Number,
  soilNutriments: Number,
  soilTexture: Number,
  soilHumidity: Number,
  heightAvg: Number,
  edible: Boolean,
  img: String,
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
