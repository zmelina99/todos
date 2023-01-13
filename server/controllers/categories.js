const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../db');
//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

async function getCategories(req, res) {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch {
    console.error(err.message);
  }
}

async function getCategory(req, res) {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM categories WHERE category_id = ${id} `);
    res.json(todo.rows);
  } catch {
    console.error(err.message);
  }
}

async function addCategory(req, res) {
  try {
    const { name, color } = req.body.categoryData;
    //await waits for the function to complete before it continues
    const newTodo = await pool.query(
      'INSERT INTO categories(category_name, color) VALUES($1, $2) RETURNING *',
      [name, color]
    );
    res.json(newTodo.rows[0]);
    //$1 is a placeholder and desciption is going to be the value
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
}
module.exports = {
  getCategories,
  getCategory,
  addCategory,
};
