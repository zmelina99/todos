const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../db');
//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

async function addTodos(req, res) {
  try {
    const { description } = req.body;
    //await waits for the function to complete before it continues
    const newTodo = await pool.query(
      'INSERT INTO todo(description) VALUES($1) RETURNING *',
      [description]
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
    const allTodos = await pool.query('SELECT * FROM todo');
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