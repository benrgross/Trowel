const router = require("express").Router();
const db = require("../../models");
const JWT = require("jsonwebtoken");
const passport = require("../../authentication/passport");

router.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(info);
    console.log(err);
    console.log(user);
    if (err || !user) {
      console.log(user);
      return res.status(400).json({
        message: "didnt work ",
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);
      const token = JWT.sign(user.toJSON(), process.env.PASSPORT_SECRET);
      res.json({ email: user.email, token: token });
    });
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await db.User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      message: "didnt work ",
    });
  }
});

module.exports = router;
