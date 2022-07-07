const router = require("express").Router();
const Stash = require("../models/Stash.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
    res.json({ greating: "het" });
});
router.post("/checkStash/:stashID/:userID", (req, res, next) => {

    const { stashID, userID } = req.params;
    const { guess } = req.body;
    let currentStash;


    if (req.session.currentUser && req.session.currentUser._id != userID) {
        res.json({ result: false, pointsAwarded: 0, msg: "You need the credentials" });
        return;
    }
    Stash.findById(stashID)
        .then(stash => {
            currentStash = stash;
            if (guess !== stash.password) {
                throw new Error("Wrong Code");
            }
            return User.findById(userID).select("stashes");
        })
        .then(user => {
            user.stashes.forEach(stash => {
                if (stash.id.equals(stashID)) {
                    throw new Error("Already completed");
                }
            })
            if (user.stashes.includes(stashID)) {
                throw new Error("Already completed");
            }
            return User.findByIdAndUpdate(userID, { $inc: { points: currentStash.value }, $push: { stashes: { id: stashID } } });

        })
        .then(() =>
            res.json({ result: true, pointsAwarded: currentStash.value, msg: `Congrats, ${currentStash.value} points gained` })
        )
        .catch(err => {
            if (err.message) {
                res.json({ result: false, pointsAwarded: 0, msg: err.message });
            }
            else {
                next(new Error(err))
            }

        });

});

module.exports = router;
