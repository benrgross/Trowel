const db = require("../models");

// Defining methods for the postsController
module.exports = {
  findAll: function (req, res) {
    db.Account.find({})
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Account.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByOne: function (req, res) {
    db.Account.findById(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Account.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  addPlantAccount: async function (req, res) {
    console.log("req", req.body.plant, req.body.accountName);
    try {
      const newPlant = await db.Plant.create(req.body.plant);
      console.log(newPlant);
      const { _id } = newPlant;

      console.log(_id);
      const plantToAccount = await db.Account.findOneAndUpdate(
        { accountName: "Fink " },
        {
          $push: {
            plants: { plant: _id },
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

  update: function (req, res) {
    db.Account.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Account.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
