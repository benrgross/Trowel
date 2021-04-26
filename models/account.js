const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  accountName: {
    type: String,
    required: true,
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
    default: 0,
  },
  notes: [
    {
      // type: Schema.Types.ObjectId,
      note: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  plants: [
    {
      plant: {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
      lightCondition: {
        type: String,
        required: false,
      },
      notes: {
        note: { type: String },
        date: { type: String },
      },
    },
  ],
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
