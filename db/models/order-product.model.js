const { Model, DataTypes } = require('sequelize');

const ORDER_PRODUCT_TABLE = 'order-product';

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const OrderProductSchema = {
    orderId: {
        type: DataTypes.INTEGER,
        nullable: false,
        field: 'order_id',
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        type: DataTypes.INTEGER,
        nullable: false,
        field: 'product_id',
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
}



class OrderProduct extends Model {
    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'orderId' });


        this.belongsToMany(models.Product, {
            through: models.OrderProduct,
            as: 'items',
            foreignKey: 'productId',
            otherKey: 'orderId',
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        }

    }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };