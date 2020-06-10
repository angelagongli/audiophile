const router = require("express").Router();
const tracksController = require("../../controllers/tracksController");

router.route("/")
  .post(tracksController.create);

router.route("/:id")
  .get(tracksController.findAll)
  .put(tracksController.update)
  .delete(tracksController.remove);

module.exports = router;
