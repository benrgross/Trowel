const router = require("express").Router();
const plantRoutes = require("./plants");
const searchRoutes = require("./search");
const authRoutes = require("./auth");

// Post routes
router.use("/plants", plantRoutes);

router.use("/search", searchRoutes);

router.use("/auth", authRoutes);

module.exports = router;
