const express = require('express');
const passport = require('passport');
const router = express.Router();
const Service = require('../services/auth.service');
const Auth = new Service();


router.post('/login',
    //We are using the local strategy and not using sessions
    passport.authenticate('local', { session: false }), async(req, res, next) => {
        try {

            const user = req.user
            const token = Auth.signToken(user);

            res.json({ user, token });

        } catch (err) {
            next(err);
        }
    }
);
router.post('/recovery',
    //We are using the local strategy and not using sessions
    async(req, res, next) => {
        try {
            const { email } = req.body;
            const message = await Auth.sendRecovery(email);
            res.json(message)
        } catch (err) {
            next(err);
        }
    }
);


router.post('/change-password',
    async(req, res, next) => {
        try {
            const { password, token } = req.body;
            const message = await Auth.changePassword(token, password);
            res.json(message)
        } catch (err) {
            next(err);
        }

    });

module.exports = router;