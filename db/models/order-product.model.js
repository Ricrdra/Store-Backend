const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_PRODUCT_TABLE = 'orders-products';

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
    amount: {
        type: DataTypes.INTEGER,
        nullable: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }


}



class OrderProduct extends Model {
    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'orderId' });

        //Basically, this is a many-to-many relationship.
        //We need to create a join table for this.
        this.belongsToMany(models.Product, {
            //through is a join table for this relationship
            through: models.OrderProduct,
            as: 'items',
            //Use both foreignKey and otherKey to specify the foreign keys
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