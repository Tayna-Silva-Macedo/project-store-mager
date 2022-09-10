const Joi = require('joi');

const insertProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const insertSalesProductsSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  insertProductSchema,
  insertSalesProductsSchema,
};
