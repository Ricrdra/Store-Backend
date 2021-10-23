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
            include: [{
                    association: 'customer',
                    include: ['user']
                },
                'items'
            ]
        });
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
    async addItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

}

module.exports = OrderService;