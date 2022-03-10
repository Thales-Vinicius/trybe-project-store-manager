const productModels = require('../models/productsModels');

const getAll = async () => productModels.getAll();

const getById = async (id) => productModels.getById(id);

const create = async (name, quantity) => {
  const nameExist = await productModels.findByName(name);
  
  if (nameExist.length > 0) return null;

  const productCreated = await productModels.create(name, quantity);

  return productCreated;
};

module.exports = {
  getAll,
  getById,
  create,
};
