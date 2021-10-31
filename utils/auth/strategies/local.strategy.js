//Destructure passport-local strategy and get just Strategy
const { Strategy } = require('passport-local');
//Import service which will be used for authentication
const Service = require("./../../../services/auth.service.js")

const Auth = new Service();
//Create a new strategy and configure it
const localStrategy = new Strategy({
        usernameField: 'email'
    },
    async(email, password, done) => {
        try {
            const user = await Auth.getUser(email, password);
            done(null, user);
        } catch (err) {
            //Return error and false, it wont be authenticated
            done(err, false);
        }
    });


//Export the strategy
module.exports = localStrategy;