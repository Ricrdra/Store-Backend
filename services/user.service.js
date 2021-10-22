//require all models previously configured by sequelize
const {models} = require("./../libs/sequelize");

//require boom handler
const boom = require('@hapi/boom')

class UserService {
    constructor() {
    }

    async create(data) {
        return models.User.create(data);
    }

    async find() {
        return await models.User.findAll({include: ['customer']});
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound("User not found");
        }

        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        return await user.update(changes);
    }

    async delete(id) {
        const user = await models.User.findByPk(id);
        if (!user) {

            throw boom.notFound("User not found");
        }
        await user.destroy();
        return {id};

    }
}

module.exports = UserService;
