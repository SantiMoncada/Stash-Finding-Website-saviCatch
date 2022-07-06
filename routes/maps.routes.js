const router = require("express").Router();

const Map = require("../models/Map.model");
const Stash = require("../models/Stash.model");

const { isLoggedIn } = require("../middleware/session-guard");
const { checkRole } = require("../middleware/check-role");
const { formatErrorMessage } = require("./../utils/formatErrorMessage");
const { default: mongoose } = require("mongoose");


//List all maps
router.get("/", (req, res, next) => {
    Map.find()
        .select("name description location ")
        .then(data => {
            res.render("maps/list-maps", { data })
        })
        .catch(err => next(new Error(err)));
});


//Create maps
router.get("/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    res.render("maps/create-map");
});

router.post("/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {

    const { name, description, type, lat, lon } = req.body

    const newMap = {
        name,
        description,
        type,
        owner: req.session.currentUser._id,
        location: {
            type: "Point",
            coordinates: [lat, lon]
        }
    }

    Map.create(newMap)
        .then(() => res.redirect("/maps"))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('maps/create-map', { errorMessage: formatErrorMessage(error) })
            }
            else {
                next(new Error(error))
            }
        });
});

//Show maps details
router.get("/:id/details", isLoggedIn, (req, res, next) => {
    Map.findById(req.params.id)
        .select("stashes reviews name description")
        .populate("stashes reviews")
        .then(map => {
            res.render("maps/details-map", { map, userID: req.session.currentUser._id })
        })
        .catch(err => next(new Error(err)));

});

//Edit map
router.get("/:id/edit", isLoggedIn, (req, res, next) => {

    Map.findById(req.params.id)
        .select("name description location")
        .then(data => res.render("maps/edit-map", data))
        .catch(err => next(new Error(err)));

});

router.post("/:id/edit", isLoggedIn, (req, res, next) => {

    const { name, description, type, lat, lon } = req.body;

    const newMap = {
        name,
        description,
        type,
        owner: req.session.currentUser._id,
        location: {
            type: "Point",
            coordinates: [lat, lon] // TODO add geocoding
        }
    }

    Map.findByIdAndUpdate(req.params.id, newMap)
        .then(() => res.redirect("/maps"))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('maps/edit-map', { errorMessage: formatErrorMessage(error) })
            }
            else {
                next(new Error(error))
            }
        });
});

//TODO delete reviews when they get added 
router.post("/:id/delete", isLoggedIn, (req, res, next) => {

    Map.findById(req.params.id)
        .select("stashes")
        .then(map => {

            if (map.stashes.length > 0) {
                const filterParam = {
                    $or: map.stashes.map(stashID => { _id: stashID })
                }
                return Stash.deleteMany(filterParam);
            }
        })
        .then(() => Map.findByIdAndDelete(req.params.id))
        .then(() => res.redirect("/maps"))
        .catch(error => next(new Error(error)));
});

module.exports = router;
