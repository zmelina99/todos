import { useEffect, useState } from 'react';
import axios from 'axios';
import { Categories } from './organisms/categories';
import styles from './app.module.scss';
import { Todos } from './organisms/todos';

export interface ICategory {
  categoryName: string;
  color: string;
  categoryId: number;
}

export interface ICategoryResponse {
  category_name: string;
  category_id: number;
  color: string;
}

export interface ITodo {
  todoName: string;
  completed: boolean;
  categoryId: number;
  categoryName: string;
  todoId: number;
  color: string;
}
export interface ITodoResponse {
  todo_id: number;
  todo_name: string;
  completed: boolean;
  category_id: number;
  category_name: string;
  color?: string;
}

export interface ISelectedCategory {
  name: string;
  id: number;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ISelectedCategory>({
    name: 'default',
    id: 0,
  });

  const fetchTodos = async () => {
    const result = await axios.get('http://localhost:5000/todos');
    const formatResult: ITodo[] = result.data.map((todo: ITodoResponse) => ({
      todoId: todo.todo_id,
      todoName: todo.todo_name,
      completed: todo.completed,
      categoryId: todo.category_id,
      categoryName: todo.category_name,
      color: todo.color ? todo.color : 'transparent',
    }));
    setTodos(formatResult);
  };

  const fetchCategories = async () => {
    const result = await axios.get('http://localhost:5000/categories');
    const formatResult: ICategory[] = result.data.map(
      (category: ICategoryResponse) => ({
        categoryName: category?.category_name,
        categoryId: category?.category_id,
        color: category?.color,
      })
    );
    setCategories(formatResult);
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  useEffect(() => {
    fetchCategories();
  }, []);
  //FIXME add newtodoadded boolean to make app more efficient and avoid continous rendering
  //FIXME add custom hook to fetch
  //FIXMEhttps://javascript.plainenglish.io/custom-hook-in-react-js-for-calling-api-useapi-7de24b42729c#:~:text=What%20is%20a%20custom%20hook%3F,be%20shared%20among%20different%20components.
  const { App__Title, App__MainComponents } = styles;
  return (
    <div className={styles.App}>
      <div className={App__Title}>To do List</div>
      <div className={App__MainComponents}>
        <Categories
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <Todos
          category={
            selectedCategory.name === 'default'
              ? 'All tasks'
              : selectedCategory.name
          }
          tasks={
            selectedCategory.id !== 0
              ? todos.filter((todo) => todo.categoryId === selectedCategory.id)
              : todos
          }
          categories={categories}
        />
      </div>
    </div>
  );
}

export default App;
