const joi = require('joi');

const userScheme = joi.object({
    firstName: joi.string().min(4).required(),
    secondName: joi.string().min(4).required(),
    city: joi.string().min(4).max(200).required(),
    age: joi.number().min(5)
});

const idUser = joi.object({
    id: joi.number().required(),
});

module.exports = { userScheme, idUser };