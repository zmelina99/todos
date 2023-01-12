import React, { useState } from 'react';
import styles from './todos.module.scss';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from '../../molecules/todo';
import { ICategory, ITodo } from '../../App';
import axios from 'axios';
import AddComponent, { ITodoData } from '../addComponent/addComponent';

interface ITodos {
  category: string;
  tasks: ITodo[];
  categories: ICategory[];
}

const Todos: React.FC<ITodos> = ({ category, tasks, categories }) => {
  const [showAddComponent, setShowAddComponent] = useState(false);

  const [todoData, setTodoData] = useState<ITodoData>({
    name: '',
    completed: false,
    category: 'default',
  });

  
  const addTodo = async () => {
    try {
      const formatCategory = categories.find(
        (category) => category.categoryName === todoData.category
      );
      const formattedTodoData = {
        name: todoData.name,
        completed: todoData.completed,
        category: formatCategory?.categoryId,
      };
      console.log(formattedTodoData);
      const result = await axios.post(`http://localhost:5000/todos`, {
        formattedTodoData,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const setData = (data: any | string) => {
    if (typeof data === 'string') {
      setTodoData({ ...todoData, category: data });
    } else setTodoData({ ...todoData, name: data?.target.value });
  };

  const { Todos__Title, Todos__Header, Todos__Button, Todos__AddComponent } = styles;
  return (
    <div className={styles.Todos}>
      <div className={Todos__Header}>
        <div className={Todos__Title}>{category} </div>
        <div className={Todos__Button}>
          <Button
            variant="primary"
            label="Add Todo"
            icon={<AiOutlinePlus />}
            onClick={() => setShowAddComponent(!showAddComponent)}
          />
          {showAddComponent && (
            <div className={Todos__AddComponent}>
              <AddComponent
                title={'Add New Todo!'}
                inputLabel={'Todo Name'}
                inputValue={todoData.name}
                setData={setData}
                addValues={addTodo}
                dropdownOptions={categories.map((category) => category.categoryName)}
                dropdownPlaceholder='Choose category'
              />
            </div>
          )}
        </div>
      </div>
      {tasks.map((task, index) => (
        <Todo
          key={index}
          task={task.todoName}
          isCompleted={task.completed}
          id={task.todoId}
          category={task.categoryName}
          color={task.color}
        />
      ))}
    </div>
  );
};
export default Todos;
