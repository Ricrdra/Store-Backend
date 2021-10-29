const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

const userService = require("./user.service")
const service = new userService();
class OrderService {

    async createFromProfile(data) {
        const user = await service.findOne(data.id);
        const customerId = user.customer.id;
        return models.Order.create({ customerId });
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


    async findByUser(id) {
        return await models.Order.findAll({
            include: [{
                association: 'customer',
                include: ['user']

            }],
            where: {
                "$customer.user.id$": id
            }
        });
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