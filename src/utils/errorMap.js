const error = {
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const errorMap = (type) => error[type];

module.exports = {
  errorMap,
};
