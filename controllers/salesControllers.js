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

module.exports = {
  getAll,
  getById,
};