const router = require("express").Router();

const Map = require("../models/Map.model");

router.get("/", (req, res, next) => {
    res.send("map");
});

router.get("/create", (req, res, next) => {
    res.render("maps/create-map");
});

router.post("/create", (req, res, next) => {
    const { name, desctiption, address, type } = req.body;
    const newMap = {
        name,
        desctiption,
        type,
    }
    Map.create(req.body)
        .then(redirect("/maps"))
        .catch(err => next(err));
});

module.exports = router;
