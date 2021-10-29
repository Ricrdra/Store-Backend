//Destructure passport-local strategy and get just Strategy
const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../../../config/index');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwtSecret,
}


const JwtStrategy = new Strategy(options, (payload, done) => {
    // done is a callback function that will be called with the user object if the token is valid
    return done(null, payload);
});
module.exports = JwtStrategy;