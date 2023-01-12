import { useCallback, useEffect, useState } from 'react';
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
  createdAt: string;
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
  const { App__Title, App__MainComponents } = styles;
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ISelectedCategory>({
    name: 'default',
    id: 0,
  });

  const fetchTodos = async () => {
    const result = await axios.get(`${process.env.REACT_APP_URL}/todos`);
    const formatResult: ITodo[] = result.data.map((todo: ITodoResponse) => ({
      todoId: todo.todo_id,
      todoName: todo.todo_name,
      completed: todo.completed,
      categoryId: todo.category_id,
      categoryName: todo.category_name,
      color: todo.color ? todo.color : 'transparent',
    }));
    setTodos(formatResult);
    setNewTodoAdded(false);
  };

  const fetchCategories = async () => {
    const result = await axios.get(`${process.env.REACT_APP_URL}/categories`);
    const formatResult: ICategory[] = result.data.map(
      (category: ICategoryResponse) => ({
        categoryName: category?.category_name,
        categoryId: category?.category_id,
        color: category?.color,
      })
    );
    setCategories(formatResult);
    setNewCategoryAdded(false);
  };

  const [newTodoAdded, setNewTodoAdded] = useState(true);
  const [newCategoryAdded, setNewCategoryAdded] = useState(true);

  const filterAndFormatTodos = useCallback(() => {
    const filteredTodos =
      selectedCategory.id !== 0
        ? todos.filter((todo) => todo.categoryId === selectedCategory.id)
        : todos;

    const sortTodos = filteredTodos.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return sortTodos;
  }, [selectedCategory, todos]);

  useEffect(() => {
    if (newTodoAdded) {
      fetchTodos();
    }
  }, [newTodoAdded]);

  useEffect(() => {
    if (newCategoryAdded) fetchCategories();
  }, [newCategoryAdded]);
  return (
    <div className={styles.App}>
      <div className={App__Title}>To do List</div>
      <div className={App__MainComponents}>
        <Categories
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          setNewCategoryAdded={setNewCategoryAdded}
        />
        <Todos
          category={
            selectedCategory.name === 'default'
              ? 'All tasks'
              : selectedCategory.name
          }
          tasks={filterAndFormatTodos()}
          categories={categories}
          setNewTodoAdded={setNewTodoAdded}
        />
      </div>
    </div>
  );
}

export default App;

