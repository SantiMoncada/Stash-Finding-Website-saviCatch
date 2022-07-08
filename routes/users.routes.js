const router = require("express").Router();
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware/session-guard');
const { rolesChecker } = require("../utils/roles-checker");
const TrivialService = require('./../services/trivial.service');
const { htmlDecode } = require("../utils/html-decode");



//My profile details routes
router.get('/myProfile', isLoggedIn, (req, res) => {

    res.redirect(`/users/${req.session.currentUser._id}`)
})

router.get('/:id', (req, res, next) => {

    const { id } = req.params;
    const role = rolesChecker(req.session.currentUser)
    const triviaPromise = TrivialService.getCustomTrivial();
    const userPromise = User.findById(id)
        .select("username avatar email description points stashes")
        .populate({ path: 'stashes.id', select: 'name value' });

    Promise.all([triviaPromise, userPromise])
        .then(response => {

            const parsedTrivia = {
                ...response[0].data.results[0],
                responses: [
                    response[0].data.results[0].correct_answer,
                    ...response[0].data.results[0].incorrect_answers
                ].sort((a, b) => 0.5 - Math.random())
            }
            req.session.correctAnswer = parsedTrivia.correct_answer;
            parsedTrivia.correct_answer = "";
            const reply = {
                success: req.session.correct,
                failure: req.session.wrong
            }

            parsedTrivia.question = htmlDecode(parsedTrivia.question);

            res.render('user/details', { user: response[1], role, trivia: parsedTrivia, reply })
        })
        .catch(err => next(new Error(err)));
})

router.post('/:id/trivia', (req, res, next) => {
    if (req.body.answers === req.session.correctAnswer) {
        req.session.correct = true;
        req.session.wrong = false;

        User.findByIdAndUpdate(req.params.id, { $inc: { "points": 1 } })
            .then(() =>
                res.redirect(`/users/${req.params.id}`)
            );
    } else {
        req.session.correct = false;
        req.session.wrong = true;
        res.redirect(`/users/${req.params.id}`);
    }
});

//Update routes
router.get('/:id/update', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .select("username avatar description")
        .then(user => {
            res.render('user/update', { user })
        })
        .catch(err => next(new Error(err)));
})


router.post('/:id/update', (req, res, next) => {

    const { username, avatar, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, avatar, description })
        .then(user => res.redirect(`/users/${req.session.currentUser._id}`))
        .catch(err => next(new Error(err)));
})


//Delete routes
router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => next(new Error(err)));
})
module.exports = router;
