const { insertProductSchema, insertSalesProductsSchema } = require('./schemas');

const insertProductValidation = (name) => {
  const { error } = insertProductSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const insertSalesProductsValidation = (productId, quantity) => {
  const { error } = insertSalesProductsSchema.validate({ productId, quantity });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  insertProductValidation,
  insertSalesProductsValidation,
};
