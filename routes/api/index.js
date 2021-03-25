const router = require("express").Router();
const plantRoutes = require("./plants");
const searchRoutes = require("./search");
const accountRoutes = require("./account");
const userRoutes = require("./user");
const authRoutes = require("./auth");

// Post routes
router.use("/plants", plantRoutes);

router.use("/accounts", accountRoutes);

router.use("/search", searchRoutes);

router.use("/user", userRoutes);

router.use("/auth", authRoutes);

module.exports = router;
