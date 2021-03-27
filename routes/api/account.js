const router = require("express").Router();
const accountController = require("../../controllers/accountController");
const { Account } = require("../../models");

// Matches with "/api/posts"
router.route("/").get(accountController.findAll).post(accountController.create);

router.route("/addPlantToAccount").post(accountController.addPlantAccount);
// Matches with "/api/posts/:id"
router.route("/findAccount").get(accountController.findAccount);

router.route("/getPlants").post(accountController.populatePlants);

router.route("/deletePlant/:id").post(accountController.deletePlant);

router.route("/findNewAccount").get(accountController.findOne);
router.route("/getPlantNote/:id").post(accountController.getPlantNote);

router.route("/addPlantNote/:id").post(accountController.postPlantNote);

// router.route("/updateNote/:id").post(accountController.updatePlantNote);
router
  .route("/:id")
  .get(accountController.findById)
  .delete(accountController.remove);

module.exports = router;
