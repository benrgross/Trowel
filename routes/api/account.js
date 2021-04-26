const router = require("express").Router();
const accountController = require("../../controllers/accountController");
const { Account } = require("../../models");

// Matches with "/api/accounts"
router.route("/").post(accountController.create);

router.route("/getAllAccounts").post(accountController.findAll);

router.route("/addPlantToAccount").post(accountController.addPlantAccount);

router.route("/findAccount").get(accountController.findOne);

router.route("/getPlants").post(accountController.populatePlants);

router.route("/deletePlant/:id").post(accountController.deletePlant);

router.route("/findNewAccount").get(accountController.findOne);

router.route("/getAccountNote/:id").get(accountController.getAccountNote);

router.route("/addAccountNote/:id").post(accountController.postAccountNote);

router.route("/getPlantNote/:id").post(accountController.getPlantNote);

router.route("/addPlantNote/:id").post(accountController.postPlantNote);

router.route("/addLightConditions").post(accountController.lightConditions);
// router.route("/updateNote/:id").post(accountController.updatePlantNote);
router
  .route("/:id")
  .get(accountController.findById)
  .delete(accountController.remove);

module.exports = router;
