const router = require("express").Router();
const db = require("../../models");
const JWT = require("jsonwebtoken");
const passport = require("../../authentication/passport");

// router.post("/login", (req, res, next) => {
//   console.log(req.body);
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     console.log(info);
//     console.log(err);
//     console.log(user);
//     if (err || !user) {
//       console.log(user);
//       return res.status(400).json({
//         message: "didnt work ",
//       });
//     }
//     req.login(user, { session: false }, (err) => {
//       if (err) res.send(err);
//       const token = JWT.sign(user.toJSON(), process.env.PASSPORT_SECRET);
//       res.json({ email: user.email, token: token });
//     });
//   })(req, res, next);
// });

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = JWT.sign(user.toJSON(), process.env.PASSPORT_SECRET);

        res.json({ email: user.email, token: token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

module.exports = router;
