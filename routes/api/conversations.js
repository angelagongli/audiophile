const router = require("express").Router();
const conversationsController = require("../../controllers/conversationsController");

router.route("/")
  .post(conversationsController.create);

router.route("/:id")
  .get(conversationsController.findById)  
  .delete(conversationsController.remove);

router.route("/user/:id")
  .get(conversationsController.findByUserId);

module.exports = router;
