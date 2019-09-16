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
    (accessToken, refreshToken, profile, done) => {
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      User.findOne({ googleId: profile.id })
        .then(exisitingUser => {
          // we already have a record with profile.id
          if (exisitingUser) {
            //done(error, userRecord)
            //this tells passport we are finished, continue with authentication process
            done(null, exisitingUser);
          }
          // dont have a record with profile.id create one
          else {
            new User({ googleId: profile.id }).save().then(user => {
              //if we are here, means we saved the new record, user is returned by the callback of the database
              done(null, user);
            });
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  )
);
