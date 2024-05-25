const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'Kartik',
  host: 'localhost',
  database: 'TestOrder',
  password: 'Kartik@2024',
  port: 5432,
});

// Ensure the orders table exists
const ensureTableExists = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        orderID VARCHAR(255) NOT NULL
      );
    `);
  } finally {
    client.release();
  }
};
ensureTableExists();

app.post('/api/orders', async (req, res) => {
  const items = req.body.items;
  if (!Array.isArray(items)) {
    return res.status(400).send('Invalid payload');
  }

  const filteredOrderIDs = items.filter(order =>
    !order.OrderBlocks.some(block => block.LineNo % 3 === 0)
  ).map(order => order.orderID);

  const client = await pool.connect();
  try {
    await ensureTableExists();
    for (const orderID of filteredOrderIDs) {
      await client.query('INSERT INTO orders(orderID) VALUES($1)', [orderID]);
    }
    res.status(201).send('Orders processed and stored successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
