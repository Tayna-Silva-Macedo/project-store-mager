const { productsModel } = require('../models');

const { insertProductValidation } = require('./validations/validationsInputValues');

const getAll = async () => {
  const result = await productsModel.getAll();

  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);

  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: result };
};

const insert = async (name) => {
  const validationResult = insertProductValidation(name);

  if (validationResult.type) return validationResult;
  
  const insertId = await productsModel.insert(name);

  return { type: null, message: insertId };
};

module.exports = {
  getAll,
  getById,
  insert,
};
