const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const todos = require('./controllers/todos');
const categories = require('./controllers/categories');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

const { addTodos, getTodos, getTodo, updateTodos, deleteTodos } = todos;
const { getCategories, getCategory, addCategory } = categories;

//routes
//create a TODO
app.post('/todos', addTodos);

//get all TODOS
app.get('/todos', getTodos);

//get a TODO
app.get('/todos/:id', getTodo);

//update a TODO
app.put('/todos/:id', updateTodos);

//delete a TODO
app.delete('/todos/:id', deleteTodos);

//get all categories
app.get('/categories', getCategories);

//get one category
app.get('/categories/:id', getCategory);

//create a new category
app.post('/categories', addCategory);



app.listen(port, () => {
  console.log(`Server running in port ${port}`);
}); //initiates the server on the 5000 port
