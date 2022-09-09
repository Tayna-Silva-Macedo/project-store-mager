const { insertProductSchema } = require('./schemas');

const insertProductValidation = (name) => {
  const { error } = insertProductSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  insertProductValidation,
};
