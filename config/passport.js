const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        username: username
      }).then(function(dbUser) {
        if (!dbUser) {
          console.log("invalid username");
          return done(null, false);
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          console.log("invalid password");
          return done(null, false);
        }
        return done(null, dbUser);
      }).catch(err => {
          console.log(err);
      });
    }
  ));
  
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

module.exports = passport;
