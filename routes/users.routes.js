const router = require("express").Router();
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware/session-guard');
const TrivialService = require('./../services/trivial.service')



//My profile details routes
router.get('/myProfile', isLoggedIn, (req, res) => {

    res.redirect(`/users/${req.session.currentUser._id}`)
})

router.get('/:id', (req, res, next) => {

    const { id } = req.params;

    User
        .findById(id)
        .select("username avatar email description points stashes")
        .populate({ path: 'stashes.id', select: 'name value' })
        .then(user => {
            console.log(user)
            res.render('user/details', user)
        })
        .catch(err => next(err))
})



//Update routes
router.get('/:id/update', (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .select("username avatar description")
        .then(user => {
            res.render('user/update', { user })
        })
        .catch(err => next(new Error(err)));
})


router.post('/:id/update', (req, res) => {

    const { username, avatar, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, avatar, description })
        .then(user => res.redirect(`/users/${req.session.currentUser._id}`))
        .catch(err => next(new Error(err)));
})


//Delete routes
router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => next(new Error(err)));
})
module.exports = router;
