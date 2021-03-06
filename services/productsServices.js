const productModels = require('../models/productsModels');

const getAll = async () => productModels.getAll();

const getById = async (id) => productModels.getById(id);

const create = async (name, quantity) => {
  const nameExist = await productModels.findByName(name);
  
  if (nameExist.length > 0) return null;

  const productCreated = await productModels.create(name, quantity);

  return productCreated;
};

const update = async (id, name, quantity) => {
  const [idExist] = await productModels.getById(id);

  if (!idExist) return null;

  const [updateProduct] = await productModels.update(id, name, quantity);

  return updateProduct;
};

const deleted = async (id) => {
  const [getProduct] = await productModels.getById(id);

  if (!getProduct) return null;

  const deletedProduct = await productModels.deleted(id);

  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
};
