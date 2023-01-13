const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});

const categoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL
);
`;

const todosTable = `
CREATE TABLE IF NOT EXISTS todo (
    todo_id SERIAL PRIMARY KEY,
    todo_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    completed BOOLEAN DEFAULT false,
    category_id INTEGER REFERENCES categories(category_id)
);
`;

const queryString =
  "INSERT INTO categories (category_name, color) VALUES ('Groceries', 'blue')";

pool.query(categoriesTable, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.command + ' : ' + res.rowCount + ' rows');

    pool.query(todosTable, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.command + ' : ' + res.rowCount + ' rows');

        pool.query(queryString, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(res.command + ' : ' + res.rowCount + ' rows');
          }
        });
      }
    });
  }
});

module.exports = pool;
