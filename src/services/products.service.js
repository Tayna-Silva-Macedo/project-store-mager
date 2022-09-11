const { productsModel } = require('../models');

const {
  insertProductValidation,
} = require('./validations/validationsInputValues');

const getAll = async () => {
  const result = await productsModel.getAll();

  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);

  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: result };
};

const insert = async (name) => {
  const validationResult = insertProductValidation(name);

  if (validationResult.type) return validationResult;

  const insertId = await productsModel.insert(name);

  return { type: null, message: insertId };
};

const update = async (name, id) => {
  const validationResult = insertProductValidation(name);

  if (validationResult.type) return validationResult;

  const affectedRows = await productsModel.update(name, id);

  if (affectedRows === 0) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  return { type: null, message: '' };
};

const destroy = async (id) => {
  const affectedRows = await productsModel.destroy(id);

  if (affectedRows === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  destroy,
};
