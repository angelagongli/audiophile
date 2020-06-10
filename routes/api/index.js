const router = require("express").Router();
const userRoutes = require("./users");
const trackRoutes = require("./tracks");
const commentRoutes = require("./comments");
const conversationRoutes = require("./conversations");

router.use("/users", userRoutes);
router.use("/tracks", trackRoutes);
router.use("/comments", commentRoutes);
router.use("/conversations", conversationRoutes);

module.exports = router;
