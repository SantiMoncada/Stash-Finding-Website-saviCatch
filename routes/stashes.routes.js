const router = require("express").Router();
const Stash = require("../models/Stash.model");
const Map = require("../models/Map.model");

const { formatErrorMessage } = require("./../utils/formatErrorMessage");
const { default: mongoose } = require("mongoose");

const { Schema, model } = require("mongoose");
const { isLoggedIn } = require('../middleware/session-guard');
const { checkRole } = require("../middleware/check-role");

//Create stash
router.get("/:mapId/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    const { mapId } = req.params;
    res.render("stashes/create-stash", { mapId });
});

router.post("/:mapId/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    const { mapId } = req.params

    const newStash = {
        ...req.body,
        owner: req.session.currentUser._id
    }
    Stash.create(newStash)
        .then(stash => Map.findByIdAndUpdate(mapId, { $push: { stashes: stash._id } }))
        .then(() => res.redirect("/maps"))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('stashes/create-stash', { errorMessage: formatErrorMessage(error) })
            }
            else {
                next(new Error(error))
            }
        })
});

//Stashes details
router.get("/:id/details", isLoggedIn, (req, res, next) => {
    const { id } = req.params
    Stash.findById(id)
        .then(data => {
            console.log(data)
            res.render("stashes/details-stash", data)
        })
        .catch(err => next(err));

})

//deleting stash
router.post("/:mapID/delete/:stashID", (req, res, next) => {
    const { mapID, stashID } = req.params;

    Map.findByIdAndUpdate(mapID, { $pull: { stashes: stashID } })
        .then(() => Stash.findByIdAndDelete(stashID))
        .then(() => res.redirect("/maps"))
        .catcht(err => next(err));
});

module.exports = router;
