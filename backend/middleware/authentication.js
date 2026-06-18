const passport = require('passport')

// Passport Authentication
const authenticateJwt = passport.authenticate('jwt', { session: false })

module.exports = authenticateJwt;