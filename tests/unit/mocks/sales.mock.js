const returnNoProductId = { message: '"productId" is required' };

const returnNoQuantity = { message: '"quantity" is required' };

const returnInvalidQuantity = { "message": "\"quantity\" must be greater than or equal to 1" }

const returnInvalidProductId = { message: "Product not found" };

const returnSucess = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  returnNoProductId,
  returnNoQuantity,
  returnInvalidQuantity,
  returnInvalidProductId,
  returnSucess,  
};
