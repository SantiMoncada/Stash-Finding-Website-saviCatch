const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");
const uploader = require("../config/uploader.config");
const saltRounds = 10;



router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", uploader.single('avatar'), (req, res, next) => {
    const { password, username, email } = req.body;

    const avatar = req.file ? req.file.path : undefined;

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
        .catch(error => next(error))
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
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            }
            
            req.session.currentUser = user
            console.log('usuario', req.session.currentUser)
            res.redirect('/')
        })
        .catch(error => next(error))
});

router.post("/logout", (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
});

module.exports = router;
