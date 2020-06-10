const db = require("../models");

module.exports = {
  findByUserId: function(req, res) {
    db.Conversation
      .find({ $or: [{ maker: req.params.id }, { joiner: req.params.id }] })
      .populate("track")
      .populate("maker", "username")
      .populate("joiner", "username")
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Conversation
      .findById(req.params.id)
      .populate("track")
      .populate("maker", "username")
      .populate("joiner", "username")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Conversation
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Conversation
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
