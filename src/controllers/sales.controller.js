const { salesService } = require('../services');

const insert = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.insert(sales);

  if (type === 'INVALID_VALUE') return res.status(422).json({ message });

  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });

  return res.status(201).json({ id: message, itemsSold: sales });
};

module.exports = {
  insert,
};
