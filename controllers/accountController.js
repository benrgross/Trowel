const db = require("../models");

// Defining methods for the postsController
module.exports = {
  findAll: function (req, res) {
    db.User.findOne(req.body)
      .populate({
        path: "accounts",
        model: "Account",
      })
      .then((dbPlants) => res.json(dbPlants))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Account.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAccount: function (req, res) {
    db.Account.findById(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  create: async function (req, res) {
    console.log("req", req.body);
    try {
      const account = await db.Account.create(req.body.account);
      const { _id } = account;
      const accountId = _id;

      const newAccount = await db.User.findOneAndUpdate(
        { email: req.body.userEmail },
        {
          $push: { accounts: accountId },
        },
        { new: true }
      );
      console.log(newAccount);
      res.json(newAccount);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },

  addPlantAccount: async function (req, res) {
    console.log("req", req.body.plant, req.body.accountName);
    try {
      const newPlant = await db.Plant.create(req.body.plant);
      console.log(newPlant);
      const { _id } = newPlant;
      const plantId = _id;

      console.log(_id);
      const plantToAccount = await db.Account.findOneAndUpdate(
        { accountName: req.body.accountName },
        {
          $push: {
            plants: { plant: plantId },
          },
        },
        { new: true }
      );
      console.log("plant to account", plantToAccount);
      res.json(plantToAccount);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  populatePlants: function (req, res) {
    db.Account.findOne(req.body)
      .populate({
        path: "plants.plant",
        model: "Plant",
      })
      .then((dbPlants) => res.json(dbPlants))
      .catch((err) => res.status(422).json(err));
  },

  update: async function (req, res) {
    try{
      const updatedAccount = await db.Account.findOneAndUpdate(
        { _id: req.params.id }, 
        {
          $pull: {
            plants: { plant: req.body.plantID },
          },
        })
    } catch (err) {
      console.log(err);
      res.json(err)
    }
  },
  remove: function (req, res) {
    db.Account.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
