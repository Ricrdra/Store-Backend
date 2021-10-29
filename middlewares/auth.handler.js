const boom = require("@hapi/boom");
const config = require("../config/index");


function checkApiKey(req, res, next) {
    const apiKey = req.headers["api"];
    if (!apiKey || apiKey !== config.server.apiKey) {
        next(boom.unauthorized("Invalid API key"));
    } else {
        next();
    }
}

function checkAdmin(req, res, next) {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        next(boom.unauthorized("Unauthorized!You cannot do this, Admins have been notified "));
    } else {
        next();
    }
}

//@param roles array of roles that can access the route
function checkRole(roles) {

    return (req, res, next) => {
        const user = req.user;
        //Check if rol is allowed to access
        if (!roles.includes(user.role)) {
            next(boom.unauthorized("Unauthorized!You cannot do this, Admins have been notified "));
        } else {
            //If everything is right, go to next middleware
            next();
        }
    }
}

module.exports = { checkApiKey, checkAdmin, checkRole };