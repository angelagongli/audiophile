const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        username: username
      }).then(function(dbUser) {
        if (!dbUser) {
          return done(null, false, "invalid username");
        }
        else if (!dbUser.validPassword(password)) {
          return done(null, false, "invalid password");
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
