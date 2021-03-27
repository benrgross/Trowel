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
      date: {
        type: Date,
        default: Date.now,
      },
      note: { type: String, retquired: false },
    },
  ],

  plants: [
    {
      plant: {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
      notes: [
        {
          note: String,
          date: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
