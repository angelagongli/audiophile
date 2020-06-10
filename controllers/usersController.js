const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query, "username")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
