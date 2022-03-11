const salesModels = require('../models/salesModels');

const getAll = async () => {
  const response = await salesModels.getAll();
  const serialize = response.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return serialize;
};

const getById = async (id) => {
  const response = await salesModels.getById(id);
  const serialize = response.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return serialize;
};

const create = async (sales) => {
  const sale = await salesModels.create(sales);

  if (!sale) return null;

  return sale;
};

const update = async (sales, saleId) => {
  const getSale = await salesModels.getById(saleId);

  if (getSale.length === 0) return null;

  const saleUpdated = await salesModels.update(sales, saleId);

  return saleUpdated;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
