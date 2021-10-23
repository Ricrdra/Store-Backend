const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
class ProductsService {

    constructor() {}


    async create(data) {
        return models.Product.create(data);
    }

    async find(query) {
        const options = {
            include: ['category'],
            where: {

            }
        };
        if (query.offset) {
            options.offset = query.offset;
        }
        if (query.limit) {
            options.limit = query.limit;
        }
        if (query.price) {
            options.where.price = query.price;
        }
        if (query.price_min) {
            options.where.price = {
                [Op.gte]: query.price_min,
                [Op.lte]: query.price_max
            }
        }
        return await models.Product.findAll(options);
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id, { include: ['category'] });
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