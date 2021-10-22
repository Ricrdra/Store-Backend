const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class ProductsService {

    constructor() {
    }


    async create(data) {
        return models.Product.create(data);
    }

    async find() {
        return await models.Product.findAll({
            include: ['category']

        });

    }

    async findOne(id) {
        const product = await models.Product.findByPk(id, {include: ['category']});
        if (!product) {
            throw boom.notFound('product not found');
        }
        return product;
    }

    async update(id, changes) {
        const product = await this.findOne(id);
        if (!product) {
            throw boom.notFound('Product not found');

        }
        return await product.update(changes);

    }

    async delete(id) {
        const product = await this.findOne(id);
        if (!product) {
            throw boom.notFound("User not found");
        }
        product.destroy();
        return id;
    }
}

module.exports = ProductsService;
