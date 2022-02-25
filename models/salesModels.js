const connection = require('./connection');

const getAll = async () => {
  const query = (
    `SELECT
      sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    WHERE sp.sale_id = s.id
    GROUP BY sp.sale_id, sp.product_id, sp.quantity, s.date
    ORDER BY sp.sale_id, sp.product_id;`
  );

  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = (
    `SELECT
      s.date,
      sp.product_id,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    WHERE sp.sale_id = (?)
    AND sp.sale_id = s.id
    GROUP BY sp.product_id, sp.quantity, s.date
    ORDER BY sp.product_id;`
  );

  const [result] = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  getAll,
  getById,
};
