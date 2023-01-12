const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../db');
//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

async function addTodos(req, res) {
  try {
    const { name, category, createdAt } = req.body.formattedTodoData;
    //await waits for the function to complete before it continues
    const newTodo = await pool.query(
      'INSERT INTO todo(todo_name, category_id, created_at) VALUES($1, $2, $3) RETURNING *',
      [name, category, createdAt]
    );
    res.json(newTodo.rows[0]);
    //$1 is a placeholder and desciption is going to be the value
  } catch (err) {
    console.error(err.message);
  }
}

async function getTodos(req, res) {
  try {
    const allTodos = await pool.query(
      'SELECT * FROM todo LEFT JOIN categories ON todo.category_id = categories.category_id'
    );

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

async function updateTodos(req, res) {
  //await waits for the function to complete before it continues
  try {
    const { name, completed } = req.body;
    const { id } = req.params;
    if (name) {
      const updateTodo = await pool.query(
        `UPDATE todo SET todo_name = $1 WHERE todo_id = $2`,
        [name, id]
      );
      res.json(updateTodo.rows[0]);
    } else {
      const updateTodoState = await pool.query(
        `UPDATE todo SET completed = $1 WHERE todo_id = $2`,
        [completed, id]
      );
      res.json(updateTodoState.rows[0]);
    }
    console.log('updated');
  } catch (err) {
    console.error(err.message);
  }
}
async function deleteTodos(req, res) {
  //await waits for the function to complete before it continues
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      `DELETE FROM todo WHERE todo_id = ${id}`
    );
    res.json('todo deleted');
  } catch (err) {
    console.error(err.message);
  }
}
module.exports = {
  addTodos,
  getTodos,
  getTodo,
  updateTodos,
  deleteTodos
};
