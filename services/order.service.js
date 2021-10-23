const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class OrderService {

    constructor() {}
    async create(data) {

        return models.Order.create(data);
    }

    async find() {
        return await models.Order.findAll();
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: "customer",
        });
        if (!order) {
            throw boom.notFound("Order not found");
        }
        return order;

    }

    async update(id, changes) {
        const order = await models.Order.findByPk(id);
        if (!order) {
            throw boom.notFound("Order not found");
        }
        order.update(changes);
        return order;
    }

    async delete(id) {
        const order = await models.Order.findByPk(id);
        if (!order) {
            throw boom.notFound("Order not found");
        }
        order.destroy();
        return order;

    }

}

module.exports = OrderService;