const router = require("express").Router();

const Map = require("../models/Map.model");
const Stash = require("../models/Stash.model");

const { isLoggedIn } = require("../middleware/session-guard");
const { checkRole } = require("../middleware/check-role");

//List all maps
router.get("/", (req, res, next) => {
    Map.find()
        .then(data => {
            res.render("maps/list-maps", { data })
        })
        .catch(err => next(err));
});


//Create maps
router.get("/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    res.render("maps/create-map");
});

router.post("/create", isLoggedIn, checkRole("ADMIN", "CREATOR"), (req, res, next) => {
    const { name, description, address, type, lat, lon } = req.body;
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
        .then(res.redirect("/maps"))
        .catch(err => next(err));
});

//Show maps details
router.get("/:id/details", (req, res, next) => {
    Map.findById(req.params.id)
        .populate("stashes")
        .populate("reviews")
        .then(data => {
            res.render("maps/details-map", data)
        })
        .catch(err => next(err));
});


router.get("/:id/edit", isLoggedIn, (req, res, next) => {

    Map.findById(req.params.id)
        .then(data => res.render("maps/edit-map", data))
        .catch(err => next(err));
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
        .then(res.redirect("/maps"))
        .catch(err => next(err));
});
//TODO delete reviews when they get added 
router.post("/:id/delete", isLoggedIn, (req, res, next) => {
    Map.findById(req.params.id)
        .select("stashes")
        .then(map => {
            console.log(map.stashes)
            const filterParam = {
                $or: []
            }
            map.stashes.forEach(stashID => {
                filterParam.$or.push({ _id: stashID });
            });

            return Stash.deleteMany(filterParam);
        })
        .then(() => Map.findByIdAndDelete(req.params.id))
        .then(() => res.redirect("/maps"))
        .catch(err => next(err));
});

module.exports = router;
