//Import required packages:
const {Model, DataTypes, Sequelize} = require("sequelize");


//Const which stores table name
const CATEGORY_TABLE = 'categories';

//Config model schema --> <modelName>Schema
const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    category: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    }, image: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

//Class which refers to the model
class Category extends Model {
    static associate(models) {
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        });
    }

    //Config model with a required sequelize instance
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = {Category, CATEGORY_TABLE, CategorySchema};


