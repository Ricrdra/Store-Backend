//require all models previously configured by sequelize
const { models } = require("./../libs/sequelize");
//require boom handler
const boom = require('@hapi/boom')

class UserService {


    async create(data) {

        const newUser = await models.User.create(data);
        //Delete password to don't send it when created
        delete newUser.dataValues.password;
        return newUser;
    }

    async find() {
        return await models.User.findAll({ include: ['customer'] });
    }

    async findByMail(email) {
        const user = await models.User.findOne({
            where: { email }
        });
        return user;
    }



    async findOne(id) {
        const user = await models.User.findByPk(id, { include: ['customer'] });
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
        return { id };

    }


}

module.exports = UserService;