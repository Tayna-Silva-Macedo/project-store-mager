const { salesModel, productsModel } = require('../models');

const {
  insertSalesProductsValidation,
} = require('./validations/validationsInputValues');

const insert = async (sales) => {
  const validationResultArray = sales.map((sale) =>
    insertSalesProductsValidation(sale.productId, sale.quantity));

  const error = validationResultArray.find((result) => result.type);

  if (error) return error;

  const someProductNotExists = await sales.reduce(async (acc, sale) => {
    const product = await productsModel.getById(sale.productId);
    if (!product) return true;
    return acc;
  }, false);

  if (someProductNotExists) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const saleId = await salesModel.insertSalesProducts(sales);

  return { type: null, message: saleId };
};

module.exports = {
  insert,
};
