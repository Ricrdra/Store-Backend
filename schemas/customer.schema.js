const {createUserSchema, updateUserSchema} = require('./user.schema');

const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(10).max(10);


const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName,
    phone,
    user: createUserSchema,

});

const updateCustomerSchema = Joi.object({
    id: id.required(),
    name,
    lastName,
    phone,
    user: updateUserSchema
});

const getCustomerSchema = Joi.object({
    id: id.required(),
});

module.exports = {createCustomerSchema, updateCustomerSchema, getCustomerSchema}
