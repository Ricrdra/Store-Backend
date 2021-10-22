const {User, UserSchema} = require("./user.model")
const {Category, CategorySchema} = require("./category.model");
const {Product, ProductSchema} = require("./product.model")
const {Order, OrderSchema} = require("./order.model")
const {Customer, CustomerSchema} = require("./customer.model")

//Initialize all models
function setupModel(sequelize) {
    //Init function receives an object with schema attributes and an object with options, these are provided by the model script

    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));


    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Product.associate(sequelize.models);
    Category.associate(sequelize.models);
    Order.associate(sequelize.models);
}

module.exports = setupModel;
