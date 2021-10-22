const {models} = require('../libs/sequelize');
const boom = require("@hapi/boom");

class CategoryService {
    async create(data) {

        return models.Category.create(data);
    }

    async find() {
        return await models.Category.findAll();
    }

    async findOne(id) {
        const category = await models.Category.findByPk(id, {include: ['products']});
        if (!category) {
            throw  boom.notFound('Category not found');
        }
        return category;
    }

    async update(id, changes) {
        const category = await this.findOne(id);
        if (!category) {
            throw boom.notFound('Category not found');
        }

        return await category.update(changes);
    }

    async delete(id) {
        const category = await this.findOne(id);
        if (!category) {
            throw boom.notFound("Category not found");
        }
        category.destroy();
        return id;
    }

}

module.exports = CategoryService;
