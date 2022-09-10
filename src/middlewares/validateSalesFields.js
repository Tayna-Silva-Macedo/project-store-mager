module.exports = (req, res, next) => {
  const sales = req.body;

  const productIdExists = sales.every((sale) => sale.productId !== undefined);

  if (!productIdExists) return res.status(400).json({ message: '"productId" is required' });

  const quantityExists = sales.every((sale) => sale.quantity !== undefined);

  if (!quantityExists) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};
