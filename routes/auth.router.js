const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/index.js');

router.post('/login',
    //We are using the local strategy and not using sessions
    passport.authenticate('local', { session: false }), async(req, res, next) => {
        try {
            const user = req.user;
            const payload = {
                sub: user.id,
                role: user.role
            }

            const token = jwt.sign(payload, config.auth.jwtSecret);

            res.json({ user, token });

        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;