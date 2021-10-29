//Destructure passport-local strategy and get just Strategy
const { Strategy } = require('passport-local');
//Import service which will be used for authentication
const Service = require("./../../../services/user.service.js")
const userService = new Service();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
//Create a new strategy and configure it
const localStrategy = new Strategy({
        usernameField: 'email'
    },
    async(email, password, done) => {
        try {
            const user = await userService.findByMail(email);

            if (!user) {
                //return error and it wont be authenticated
                done(boom.unauthorized(), false);
                return;
            }
            //Using bcrypt to compare the password with the hash
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                done(boom.unauthorized(), isMatch);
                return;
            }
            delete user.dataValues.password;
            //Null errors and return user
            done(null, user);
        } catch (err) {
            //Return error and false, it wont be authenticated
            done(err, false);
        }
    });


//Export the strategy
module.exports = localStrategy;