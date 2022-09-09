const { productsServices } = require('../services');

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await productsServices.getById(id);

  if (result.type) return res.status(404).json({ message: result.message });

  return res.status(200).json(result.message);
};

module.exports = {
  getAll,
  getById,
};
