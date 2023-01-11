import React, { useEffect } from 'react';
import './App.css';
import Checkbox from './atoms/checkbox/checkbox';
import { Category } from './atoms/category';
import { Button } from './atoms/button';
import { DropdownSelect } from './molecules/dropdownSelect';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from './molecules/todo';
import axios from 'axios';

export interface ICategory {
  name: string;
  color: string;
  id: number;
}

const categories: Record<string, ICategory> = {
  1: {
    name: 'groceries',
    color: '#27AE60',
    id: 1,
  },
};

function App() {
  const fetchTodos = async () => {
    const result = await axios.get('http://localhost:5000/todos');
    const todo = await axios.get('http://localhost:5000/todos/1');

    console.log(result, todo)
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="App">
      <Checkbox checked={true} />
      <Category {...Object.values(categories)[0]} />
      <Button variant="secondary" label="click" icon={<AiOutlinePlus />} />
      <DropdownSelect
        dropdownOptions={['groceries', 'bananas']}
        placeholder="Select category"
      />
      <Todo task="Clean kitchen" checked={true} />
    </div>
  );
}

export default App;
