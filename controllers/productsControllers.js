const productServices = require('../services/productsServices');

const getAll = async (_req, res, _next) => {
  const result = await productServices.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const [result] = await productServices.getById(Number(id));

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

const create = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const result = await productServices.create(name, quantity);

  if (!result) return res.status(409).json({ message: 'Product already exists' });

  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
};
