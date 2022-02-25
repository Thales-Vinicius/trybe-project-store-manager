const productModels = require('../models/productsModels');

const getAll = async () => productModels.getAll();

const getById = async (id) => productModels.getById(id);

module.exports = {
  getAll,
  getById,
};
