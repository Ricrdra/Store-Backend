const { CATEGORY_TABLE } = require('./category.model');

const { Model, DataTypes, Sequelize } = require("sequelize");

const PRODUCT_TABLE = 'products';
const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING
    },
    categoryId: {
        allowNull: false,
        field: "category_id",
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}


class Product extends Model {
    static associate(models) {
        this.belongsTo(models.Category, { as: 'category', });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { Product, PRODUCT_TABLE, ProductSchema };