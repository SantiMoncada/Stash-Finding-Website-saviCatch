const router = require("express").Router();
const Stash = require("../models/Stash.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
    res.json({ greating: "het" });
});
router.post("/checkStash/:stashID/:userID", (req, res, next) => {
    const { stashID, userID } = req.params;
    const { guess } = req.body;
    Stash.findById(stashID)
        .then(stash => {
            if (guess !== stash.password) {
                res.json({ result: false, pointsAwarded: 0, msg: "Wrong Code" });
                return;
            }
            return User.findById(userID)
                .select("stashes");
        })
        .then(user => {
            if (user.stashes.includes(stashID)) {
                res.json({ result: false, pointsAwarded: 0, msg: "Alredy completed" });
                return;
            }
            return User.findByIdAndUpdate(userID, { $inc: { points: stash.value }, $push: { stashes: stashID } });

        })
        .then(() =>
            res.json({ result: true, pointsAwarded: stash.value, msg: `Congrats, ${stash.value} points gained` })
        )
        .catch(err => next(err));

});

module.exports = router;
