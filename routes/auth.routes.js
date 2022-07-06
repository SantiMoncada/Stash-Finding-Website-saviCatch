const router = require("express").Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const uploader = require("../config/uploader.config");
const saltRounds = 10;

const { formatErrorMessage } = require("./../utils/formatErrorMessage");


router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", uploader.single('avatar'), (req, res, next) => {
    const { password, username, email } = req.body;

    const avatar = req.file?.path

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({
            username,
            email,
            password: hashedPassword,
            avatar
        }))
        .then(createdUser => res.redirect('/'))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('auth/signup', { errorMessage: formatErrorMessage(error) })
            }
            else {
                next(new Error(error))
            }
        })
});

router.get("/login", (req, res, next) => {
    res.render("auth/login");
});

router.post("/login", (req, res, next) => {
    const { username, password } = req.body
    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Username is not registered' })
                return
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Password incorrect' })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(error => next(error))


});

router.post("/logout", (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
});

module.exports = router;
