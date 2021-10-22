//require all models previously configured by sequelize
const {models} = require("./../libs/sequelize");

//require boom handler
const boom = require('@hapi/boom')

class CustomerService {
    constructor() {
    }

    async create(data) {
        const newUser = await models.User.create(data.user);
        const newCustomer = await models.Customer.create({
            ...data, userId: newUser.id

        });
        return newCustomer;
    }

    async find() {
        return await models.Customer.findAll({
            include: ['user']
        });
    }

    async findOne(id) {
        const Customer = await models.Customer.findByPk(id);
        if (!Customer) {
            throw boom.notFound("Customer not found");
        }

        return Customer;
    }

    async update(id, changes) {
        const customer = await this.findOne(id);
        return await customer.update(changes);
    }

    async delete(id) {
        const costumer = await models.Customer.findByPk(id);
        if (!costumer) {

            throw boom.notFound("User not found");
        }
        await costumer.destroy();
        return {id};

    }
}

module.exports = CustomerService;
