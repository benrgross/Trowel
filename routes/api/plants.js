const router = require("express").Router();
const plantController = require("../../controllers/plantController");

// Matches with "/api/posts"
router.route("/").get(plantController.findAll).post(plantController.create);

// Matches with "/api/posts/:id"
router
  .route("/:id")
  .get(plantController.findById)
  .put(plantController.update)
  .delete(plantController.remove);

module.exports = router;
