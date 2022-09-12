const { salesService } = require('../services');
const { errorMap } = require('../utils/errorMap');

const insert = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.insert(sales);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(201).json({ id: message, itemsSold: sales });
};

const getAll = async (_req, res) => {
  const result = await salesService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getById(id);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(200).json(message);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.destroy(id);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const { type, message } = await salesService.update(sales, id);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(200).json({ saleId: id, itemsUpdated: sales });
};

module.exports = {
  insert,
  getAll,
  getById,
  destroy,
  update,
};
