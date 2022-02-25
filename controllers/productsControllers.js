const productServices = require('../services/productsServices');

const getAll = async (_req, res, _next) => {
  const response = await productServices.getAll();

  return res.status(200).json(response);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const result = await productServices.getById(Number(id));

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};
