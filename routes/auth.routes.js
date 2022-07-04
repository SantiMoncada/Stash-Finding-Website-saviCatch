const router = require("express").Router();


router.get("/login", (req, res, next) => {
    res.render("auth/create");
});

router.post("/login", (req, res, next) => {
    res.send("login");
});

router.get("/signup", (req, res, next) => {
    res.send("signup");
});

router.post("/signup", (req, res, next) => {
    res.send("signup");
});

router.post("/logout", (req, res, next) => {
    res.send("logut");
});
module.exports = router;
