const rolesChecker = user => {
    return {
        //now works with node versions older than 14.0.0 (i have 12.0)
        isUSER: user?.role === 'USER',
        isCREATOR: user?.role === 'CREATOR',
        isADMIN: user?.role === 'ADMIN',
    }
}

module.exports = { rolesChecker }