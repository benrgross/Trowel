const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountName: { type: String, required: true },
  clientContact: {
    type: String,
    clientName: { type: String },
    phone: { type: Number },
    address: { type: String },
    email: { type: String },
    required: true,
  },
  location: {
    type: String,
    address: { type: String },
    distName: { type: String },
    required: true,
  },
  plants: { type: Number, required: true },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
