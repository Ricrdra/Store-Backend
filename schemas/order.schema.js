const joi = require("joi");

const customerId = joi.number().integer();

const createOrderSchema = joi.object({});
const getOrderSchema = joi.object({customerId: customerId.required()});
const updateOrderSchema = joi.object({customerId: customerId.required()});


module.exports = {createOrderSchema, getOrderSchema, updateOrderSchema}
