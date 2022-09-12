const { productsModel } = require('../models');

const {
  insertSalesProductsValidation,
} = require('../services/validations/validationsInputValues');

const errorInputValues = (sales) => {
  const validationResultArray = sales.map((sale) =>
    insertSalesProductsValidation(sale.productId, sale.quantity));

  return validationResultArray.find((result) => result.type);
};

const someProductNotExists = async (sales) =>
  sales.reduce(async (acc, sale) => {
    const product = await productsModel.getById(sale.productId);
    if (!product) return true;
    return acc;
  }, false);

module.exports = {
  errorInputValues,
  someProductNotExists,
};
