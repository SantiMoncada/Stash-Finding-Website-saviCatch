const rolesChecker = user => {
    return {
        //now works with node versions older than 14.0.0 (i have 12.0)
        isUSER: user ? user.role === 'USER' : false,
        isCREATOR: user ? user.role === 'CREATOR' : false,
        isADMIN: user ? user.role === 'ADMIN' : false,
    }
}

module.exports = { rolesChecker }