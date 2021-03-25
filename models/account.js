const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  accountName: { 
    type: String, 
    required: true 
  },
  clientContact: {
    clientName: String,
    phone: String,
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
  plants: [],
  notes: String
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
