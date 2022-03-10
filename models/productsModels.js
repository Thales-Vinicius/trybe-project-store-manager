const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';

  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = (?);';

  const [result] = await connection.execute(query, [id]);

  return result;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';

  const [result] = await connection.execute(query, [name, quantity]);

  const newProduct = {
    id: result.insertId,
    name,
    quantity,
  };

  return newProduct;
};

const findByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = (?);';

  const [result] = await connection.execute(query, [name]);

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  findByName,
};
