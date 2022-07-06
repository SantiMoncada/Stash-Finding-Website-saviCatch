const router = require("express").Router();

router.use("/", require("./index.routes"));

router.use("/", require("./auth.routes"));

router.use("/maps", require("./maps.routes"));

router.use("/users", require("./users.routes"));

router.use("/stashes", require("./stashes.routes"));

router.use("/reviews", require("./reviews.routes"));


module.exports = router;
