const connection = require('./connection');
const productModels = require('./productsModels');

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

const handleQuantity = async (id, quantity) => {
  const [product] = await productModels.getById(id);

  const quantityUpdate = product.quantity - quantity;

  const query = `UPDATE StoreManager.products 
    SET 
      quantity = (?) 
    WHERE id = (?);`;

  await connection.execute(query, [quantityUpdate, id]);
};

const create = async (sales) => {
  const querySaleId = 'INSERT INTO StoreManager.sales () VALUES ();';
  const [saleId] = await connection.execute(querySaleId);
  const { insertId } = saleId;
  // obrigado promise.all
  await Promise.all(sales.map(async ({ productId, quantity }) => {
    const query = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?,?,?);`;
    
    const [salesProducts] = await connection.execute(query, [insertId, productId, quantity]);

    return salesProducts;
  }));
  const [info] = sales;

  handleQuantity(info.productId, info.quantity);

  return { id: insertId, itemsSold: sales };
};

module.exports = {
  getAll,
  getById,
  create,
};
