const { productsService } = require('../services');
const { errorMap } = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getById(id);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.insert(name);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(201).json({ id: message, name });
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { type, message } = await productsService.update(name, id);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(200).json({ id, name });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.destroy(id);

  if (type) return res.status(errorMap(type)).json({ message });

  return res.status(204).end();
};

const getByName = async (req, res) => {
  const { q } = req.query;

  const result = await productsService.getByName(q);

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  destroy,
  getByName,
};
