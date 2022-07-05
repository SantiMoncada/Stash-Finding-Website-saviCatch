const router = require("express").Router();
const Stash = require("../models/Stash.model");
const Map = require("../models/Map.model");


const { Schema, model } = require("mongoose");
const { isLoggedIn } = require('../middleware/session-guard');


//Create stash
router.get("/:mapId/create", isLoggedIn, (req, res, next) => {
    const { mapId } = req.params;
    res.render("stashes/create-stash", { mapId });
});

router.post("/:mapId/create", isLoggedIn, (req, res, next) => {
    const { name, description, hints, password, type } = req.body;
    const newStash = {
        name,
        description,
        hints,
        password,
        type,
        owner: req.session.currentUser._id
    }
    Stash.create(newStash)
        .then(res.redirect("/maps"))
        .catch(err => next(err));
});

//List of stashes

module.exports = router;
