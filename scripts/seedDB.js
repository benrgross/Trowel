const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Posts collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trowell");

const plantSeed = [
  {
    commonName: "Ilex Crennata",
    sciName: "Ink Berry",
  },
];

db.Plant.remove({})
  .then(() => db.Plant.collection.insertMany(plantSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
