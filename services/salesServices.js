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

module.exports = {
  getAll,
  getById,
};
