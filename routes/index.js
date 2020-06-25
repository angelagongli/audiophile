const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const User = require("../models/user");
const passport = require("../config/passport");

router.use("/api", apiRoutes);

router.post("/api/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });    
  })(req, res, next);
});

router.post("/api/signup",
  function(req, res) {
    User.findOne({
      username: req.body.username
    }).then(function(dbUser) {
      if (dbUser) {
        return res.json("user in database");
      }
      User.create({
        username: req.body.username,
        password: req.body.password
      })
      .then(function(dbUser) {
        res.json(dbUser);
      });
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

router.route("/api/user_data")
  .get(function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        id: req.user._id
      });
    }
  });

router.route("/logout")
.get(function(req, res) {
  req.logout();
  res.redirect("/");
});

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
