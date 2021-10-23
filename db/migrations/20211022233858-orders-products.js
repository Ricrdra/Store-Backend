'use strict';
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

    },

    down: (queryInterface) => {
        return queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    }
};