const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES()',
  );

  return insertId;
};

const insertSalesProducts = async (sales) => {
  const saleId = await insertSale();

  sales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [saleId, sale.productId, sale.quantity],
    );
  });

  return saleId;
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT SP.sale_id saleId, S.date, SP.product_id productId, SP.quantity
      FROM StoreManager.sales S
      JOIN StoreManager.sales_products SP
      ON S.id = SP.sale_id
      ORDER BY saleId, productId`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT S.date, SP.product_id productId, SP.quantity
      FROM StoreManager.sales S
      JOIN StoreManager.sales_products SP ON S.id = SP.sale_id
      WHERE SP.sale_id = ?
      ORDER BY SP.sale_id , SP.product_id`,
    [id],
  );
  
  return result;
};

module.exports = {
  insertSalesProducts,
  getAll,
  getById,
};
