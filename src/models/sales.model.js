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

module.exports = {
  insertSalesProducts,
};
