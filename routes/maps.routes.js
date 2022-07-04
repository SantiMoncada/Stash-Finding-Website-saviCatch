const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.send("map");
});

router.get("/create", (req, res, next) => {
    res.send("map");
});
module.exports = router;
