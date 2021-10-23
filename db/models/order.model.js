const { Model, DataTypes, Sequelize } = require("sequelize");
const { CUSTOMER_TABLE } = require("./customer.model");

const ORDER_TABLE = 'orders';
const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
}


class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, {
            foreignKey: 'customerId',
            as: 'customer'
        });


        this.belongsToMany(models.Product, {
            as: "items",
            through: models.OrderProduct,
            foreignKey: 'productId',
            otherKey: 'orderId',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };