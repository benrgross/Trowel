const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountName: { 
    type: String, 
    required: true 
  },
  clientContact: {
    clientName: String,
    phone: Number,
    email: String,
    // clientAddress: String,
  },
  location: {
    address: String,
    distZone: String,
  },
  plantCount: {
    type: Number,
    default: 0
  },
  plants: []
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
