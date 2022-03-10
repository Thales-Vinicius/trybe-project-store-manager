const salesServices = require('../services/salesServices');

const getAll = async (_req, res, _next) => {
  const response = await salesServices.getAll();

  return res.status(200).json(response);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const response = await salesServices.getById(Number(id));

  if (response.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(response);
};

const create = async (req, res, _next) => {
  const sales = req.body;

  const sale = await salesServices.create(sales);

  return res.status(201).json(sale);
};

module.exports = {
  getAll,
  getById,
  create,
};