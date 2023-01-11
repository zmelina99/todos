const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../db');
//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

async function addTodos(req, res) {
  console.log(req.body, 'body');
  try {
    const { name, category } = req.body.todoData;
    //await waits for the function to complete before it continues
    const newTodo = await pool.query(
      'INSERT INTO todo(todo_name, category_id) VALUES($1, $2) RETURNING *',
      [name, category]
    );
    res.json(newTodo.rows[0]);
    //$1 is a placeholder and desciption is going to be the value
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
}

async function getTodos(req, res) {
  try {
    const allTodos = await pool.query('SELECT * FROM todo LEFT JOIN categories ON todo.category_id = categories.category_id'); 
    
    res.json(allTodos.rows);
  } catch {
    console.error(err.message);
  }
}

async function getTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id} `);
    res.json(todo.rows);
  } catch {
    console.error(err.message);
  }
}
module.exports = {
  addTodos,
  getTodos,
  getTodo,
};
