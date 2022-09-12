const returnNoProductId = { message: '"productId" is required' };

const returnNoQuantity = { message: '"quantity" is required' };

const returnInvalidQuantity = {
  message: '"quantity" must be greater than or equal to 1',
};

const returnInvalidProductId = { message: "Product not found" };

const returnSucessPost = {
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

const returnSucessUpdate = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

const returnSucessGet = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const returnSucessGetById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  returnNoProductId,
  returnNoQuantity,
  returnInvalidQuantity,
  returnInvalidProductId,
  returnSucessPost,
  returnSucessUpdate,
  returnSucessGet,
  returnSucessGetById,
};
