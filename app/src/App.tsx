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
    setNewTodoAdded(false);
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
      fetchTodos()
    };
  }, [newTodoAdded]);

  useEffect(() => {
    if (newCategoryAdded) fetchCategories();
  }, [newCategoryAdded]);

  console.log(todos, filterAndFormatTodos())
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

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// interface ITodoResponse {
//   todo_id: number;
//   todo_name: string;
//   completed: boolean;
//   category_id: number;
//   category_name: string;
//   color?: string;
// }
// interface ICategoryResponse {
//   category_name: string;
//   category_id: number;
//   color: string;
// }

// export const useTodos = () => {
//     const [todos, setTodos] = useState([]);
//     const [newTodoAdded, setNewTodoAdded] = useState(true);

//     useEffect(() => {
//         const fetchTodos = async () => {
//             const result = await axios.get('http://localhost:5000/todos');
//             const formatResult = formatTodoData(result.data);
//             setTodos(formatResult);
//             setNewTodoAdded(false);
//         };

//         if (newTodoAdded) fetchTodos();
//     }, [newTodoAdded]);
//     return [todos, setNewTodoAdded];
// }

// export const useCategories = () => {
//     const [categories, setCategories] = useState([]);
//     const [newCategoryAdded, setNewCategoryAdded] = useState(true);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             const result = await axios.get('http://localhost:5000/categories');
//             const formatResult = formatCategoryData(result.data);
//             setCategories(formatResult);
//             setNewCategoryAdded(false);
//         };

//         if (newCategoryAdded) fetchCategories();
//     }, [newCategoryAdded]);
//     return [categories, setNewCategoryAdded];
// }

// const formatTodoData = (data: ITodoResponse[]) => {
//     return data.map(todo => ({
//         todoId: todo.todo_id,
//         todoName: todo.todo_name,
//         completed: todo.completed,
//         categoryId: todo.category_id,
//         categoryName: todo.category_

// import useFetchData from 'path/to/useFetchData';

// function App() {
//   const [todos, categories, selectedCategory, setSelectedCategory, refetchData] = useFetchData();
//   // rest of the component code
// }

// <AddComponent
// onComplete={()=>refetchData()}
// />
