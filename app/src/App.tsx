import React, { useEffect, useState } from 'react';
import Checkbox from './atoms/checkbox/checkbox';
import { Category } from './atoms/category';
import { Button } from './atoms/button';
import { DropdownSelect } from './molecules/dropdownSelect';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from './molecules/todo';
import axios from 'axios';
import { Categories } from './organisms/categories';
import styles from './app.module.scss';
import { Todos } from './organisms/todos';

export interface ICategory {
  name: string;
  color: string;
  category_id: number;
}


function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const fetchTodos = async () => {
    const result = await axios.get('http://localhost:5000/todos');
    setTodos(result.data);
  };

  const fetchCategories = async () => {
    const result = await axios.get('http://localhost:5000/categories');
    setCategories(result.data);
  };

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  console.log(selectedCategory);
  const { App__Title, App__MainComponents } = styles;
  return (
    <div className={styles.App}>
      <div className={App__Title}>To do List</div>
      <div className={App__MainComponents}>
        <Categories
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          isSelected={selectedCategory}
        />
        <Todos
          category={'all tasks'}
          tasks={
            selectedCategory !== 0
              ? todos.filter((todo) => todo.category_id === selectedCategory)
              : todos
          }
          categories={categories}
        />
      </div>
    </div>
  );
}

export default App;
