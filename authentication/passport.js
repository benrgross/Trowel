const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, cb) => {
      const user = await db.User.findOne({ email });
      console.log(user);
      console.log(email, password);
      try {
        if (!user) {
          return cb(null, false, {
            message: "incorrect email",
          });
        }
        if (password === user.password) {
          return cb(null, user, {
            message: "succesful logged in ",
          });
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "process.env.PASSPORT_SECRET",
    },

    async function (jwtPayload, cb) {
      const user = await db.User.find({ _id: jwtPayload });
      try {
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

module.exports = passport;
