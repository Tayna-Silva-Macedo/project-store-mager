const { salesService } = require('../services');

const insert = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.insert(sales);

  if (type === 'INVALID_VALUE') return res.status(422).json({ message });

  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });

  return res.status(201).json({ id: message, itemsSold: sales });
};

const getAll = async (_req, res) => {
  const result = await salesService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.destroy(id);

  if (type) return res.status(404).json({ message });

  return res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const { type, message } = await salesService.update(sales, id);

  if (type === 'SALE_NOT_FOUND') return res.status(404).json({ message });

  if (type === 'INVALID_VALUE') return res.status(422).json({ message });

  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });

  return res.status(200).json({ saleId: id, itemsUpdated: sales });
};

module.exports = {
  insert,
  getAll,
  getById,
  destroy,
  update,
};
