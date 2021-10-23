const express = require("express");

const router = express.Router();
const OrderService = require("./../services/order.service");
const validatorHandler = require("../middlewares/validator.handler");
const { getOrderSchema } = require("./../schemas/order.schema");
const service = new OrderService();

// routes get for orders
router.get("/", async(req, res, next) => {
    try {
        const orders = await service.find();
        res.json(orders);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async(req, res, next) => {
    try {
        const order = await service.findOne(req.params.id);
        res.status(201).json(order);
    } catch (e) {
        next(e);
    }

})

router.post(
    "/",
    validatorHandler(getOrderSchema, "body"),
    async(req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.create(body));
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    "/:id",
    validatorHandler(getOrderSchema, "params"),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            res.status(201).json({
                message: "user successfully deleted",
                user: await service.update(id, body)
            });
        } catch (error) {
            next(error);
        }

    }
);

// delete orders by id
router.delete(
    "/:id",
    validatorHandler(getOrderSchema, "params"),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(204).json({ message: "Order successfully deleted" });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;