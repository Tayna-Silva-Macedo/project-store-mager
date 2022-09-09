const Joi = require('joi');

const insertProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  insertProductSchema,
};
