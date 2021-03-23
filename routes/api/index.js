const router = require("express").Router();
const plantRoutes = require("./plants");
const searchRoutes = require("./search");

// Post routes
router.use("/plants", plantRoutes);

router.use("/search", searchRoutes);

module.exports = router;
