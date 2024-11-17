const joi = require('joi');

const schema = joi.object({
    id: joi.number().required(),
    title: joi.string().min(1).required(),
    content: joi.string().min(10).required(),
});

const result = schema.validate({
    id: 1,
    title: '1',
    content: 'lorem 10 asd asdde ',
});

console.log(result.error?.details);