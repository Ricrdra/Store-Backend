//Import required packages:
const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require('./user.model.js')
    //Const which stores table name
const CUSTOMER_TABLE = 'customers';
//Config model schema --> <modelName>Schema
const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

//Class which refers to the model
class Customer extends Model {
    static associate(models) {

        this.hasMany(models.Order, {
            foreignKey: 'customerId',
            as: 'orders'
        });


        this.belongsTo(models.User, {
            as: "user",
            foreignKey: 'user_id'
        });


    }


    //Config model with a required sequelize instance
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
}

module.exports = { Customer, CUSTOMER_TABLE, CustomerSchema };