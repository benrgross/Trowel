const router = require("express").Router();
const plantController = require("../../controllers/plantController");

router.route("/").get(plantController.findAll).post(plantController.create);

router
  .route("/:id")
  .get(plantController.findById)
  .put(plantController.update)
  .delete(plantController.remove);

module.exports = router;
