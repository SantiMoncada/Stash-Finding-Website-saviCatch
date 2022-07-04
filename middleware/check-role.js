const checkRole = (...grantedRoles) => (req, res, next) => {

    if (grantedRoles.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Permission denied' })
    }
}

module.exports = { checkRole }