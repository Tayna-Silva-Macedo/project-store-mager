const { salesModel } = require('../models');

const checkSalesFields = require('../utils/checkSalesFields');

const insert = async (sales) => {
  const error = checkSalesFields.errorInputValues(sales);

  if (error) return error;

  const productNotFound = await checkSalesFields.someProductNotExists(sales);

  if (productNotFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const saleId = await salesModel.insertSalesProducts(sales);

  return { type: null, message: saleId };
};

const getAll = async () => {
  const result = await salesModel.getAll();

  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);

  if (result.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: result };
};

const destroy = async (id) => {
  const affectedRows = await salesModel.destroy(id);

  if (affectedRows === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: '' };
};

const update = async (sales, id) => {
  const saleToUpdate = await salesModel.getById(id);

  if (saleToUpdate.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const error = checkSalesFields.errorInputValues(sales);

  if (error) return error;

  const productNotFound = await checkSalesFields.someProductNotExists(sales);

  if (productNotFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await salesModel.update(sales, id);

  return { type: null, message: '' };
};

module.exports = {
  insert,
  getAll,
  getById,
  destroy,
  update,
};
