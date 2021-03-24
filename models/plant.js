const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  commonName: { type: String, required: true },
  sciName: { type: String, required: true },
  distZone: String,
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
