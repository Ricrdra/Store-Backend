const joi = require("joi");

const customerId = joi.number().integer();
const orderId = joi.number().integer();
const productId = joi.number().integer();
const amount = joi.number().integer().min(1);



const addItemSchema = joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
});

const createOrderSchema = joi.object({});
const getOrderSchema = joi.object({ customerId: customerId.required() });
const updateOrderSchema = joi.object({ customerId: customerId.required() });







module.exports = { createOrderSchema, getOrderSchema, updateOrderSchema, addItemSchema }