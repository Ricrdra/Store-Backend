const express = require('express');
const passport = require('passport');


const router = express.Router();
const Order = require('../services/order.service');
const service = new Order();
router.get('/my-orders',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const user = req.user;
            const orders = await service.findByUser(user.sub);
            res.json({
                userId: user.id,
                orders
            });
        } catch (e) {
            next(e)
        }
    });



router.post("/my-orders",
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        const data = { id: req.user.sub }

        try {
            res.status(201).json(await service.createFromProfile(data));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;