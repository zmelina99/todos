const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

//routes

//create a TODO
app.post('/todos', async (req, res) => {
  //await waits for the function to complete before it continues
  try {
    const { description } = req.body;
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
});

//get all TODOS
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch {
    console.error(err.message);
  }
});

//get a TODO
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id} `);
    res.json(todo.rows);
  } catch {
    console.error(err.message);
  }
});

//update a TODO
app.put('/todos/:id', async (req, res) => {
  //await waits for the function to complete before it continues
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updateTodo = await pool.query(
      //   `UPDATE todo SET description = ${description} WHERE todo_id = ${id}`
      `UPDATE todo SET description = $1 WHERE todo_id = $2`,
      [description, id]
    );
    res.json(updateTodo.rows[0]);
    console.log('updated');
  } catch (err) {
    console.error(err.message);
  }
});

//delete a TODO
app.delete('/todos/:id', async (req, res) => {
  //await waits for the function to complete before it continues
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`);
    res.json('todo deleted');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server running in port 5000');
}); //initiates the server on the 5000 port
