const {models} = require("../libs/sequelize");
const boom = require("@hapi/boom");

class OrderService {

    constructor() {
    }

    async create(data) {
        return models.Order.create(data);
    }

    async find() {
        return await models.Order.findAll();
    }

    async findOne(id) {
        return await models.Order.findByPk(id, {
            include: "customer",
        });

    }

    async update(id, changes) {
        return {
            id,
            changes,
        };
    }

    async delete(id) {
        return {id};
    }

}

module.exports = OrderService;
