const passport = require('passport')

// Passport Authentication
const authenticateJWT = passport.authenticate('jwt', { session: false })

module.exports = authenticateJWT;