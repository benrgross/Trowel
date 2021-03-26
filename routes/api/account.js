const router = require("express").Router();
const accountController = require("../../controllers/accountController");
const { Account } = require("../../models");

// Matches with "/api/posts"
router.route("/").get(accountController.findAll).post(accountController.create);

router.route("/addPlantToAccount").post(accountController.addPlantAccount);
// Matches with "/api/posts/:id"
router.route("/findAccount");
router
  .route("/:id")
  .get(accountController.findById)
  .put(accountController.update)
  .delete(accountController.remove);

module.exports = router;
