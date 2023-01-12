const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const todos = require('./controllers/todos');
const categories = require('./controllers/categories');

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

const { addTodos, getTodos, getTodo } = todos;
const { getCategories, getCategory } = categories;
//routes

//create a TODO
app.post('/todos', addTodos);

//get all TODOS
app.get('/todos', getTodos);

//get a TODO
app.get('/todos/:id', getTodo);

app.get('/categories', getCategories);

app.get('/categories/:id', getCategory);
app.post('/categories', categories.addCategory);


//update a TODO
app.put('/todos/:id', async (req, res) => {
  //await waits for the function to complete before it continues
  try {
    const { description, completed } = req.body;
    const { id } = req.params;
    if (description) {
      const updateTodo = await pool.query(
        `UPDATE todo SET description = $1 WHERE todo_id = $2`,
        [description, id]
      );
      res.json(updateTodo.rows[0]);
    } else {
      console.log(completed)
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
});

//delete a TODO
app.delete('/todos/:id', async (req, res) => {
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
});

app.listen(5000, () => {
  console.log('Server running in port 5000');
}); //initiates the server on the 5000 port
