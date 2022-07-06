const router = require("express").Router();

const Review = require("../models/Review.model");
const Map = require("../models/Map.model");

const { isLoggedIn } = require("../middleware/session-guard");

//createReview
router.post("/:mapID/create", isLoggedIn, (req, res, next) => {

    const { mapID } = req.params;

    const newReview = {
        ...req.body,
        owner: req.session.currentUser._id
    }

    Review.create(newReview)
        .then(review => {
            return Map.findByIdAndUpdate(mapID, { $push: { reviews: review._id } })
        })
        .then(() => res.redirect(`/maps/${mapID}/details`))
        .catch(err => next(err))
});

module.exports = router;
