const router = require("express").Router();

const Map = require("../models/Map.model");

const { isLoggedIn } = require("../middleware/session-guard");
const { checkRole } = require("../middleware/check-role");

router.get("/", (req, res, next) => {
    res.send("map");
});

router.get("/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    res.render("maps/create-map");
});

router.post("/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    const { name, desctiption, address, type } = req.body;
    const newMap = {
        name,
        desctiption,
        type,
        owner: req.session.currentUser._id,
        location: {
            type: "Point",
            coordinates: [0, 0] // TODO add geocoding
        }
    }
    Map.create(newMap)
        .then(res.redirect("/maps"))
        .catch(err => next(err));
});


module.exports = router;
