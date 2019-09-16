const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("../config/keys");

//one argument in mongoose means we try to fetch a model schema
//two arguments in mongoose means we are trying to load something into it
const User = mongoose.model("users");

//user.id from the mongo record not profile.id from google auth
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      const exisitingUser = await User.findOne({ googleId: profile.id });
      //refactor, return stops execution if first is true
      if (exisitingUser) {
        return done(null, exisitingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
      // if (exisitingUser) {
      //   done(null, exisitingUser);
      // } else {
      //   const user = await new User({ googleId: profile.id }).save();
      //   done(null, user);
      // }
    }
  )
);
