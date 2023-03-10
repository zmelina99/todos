import React, { useState } from 'react';
import styles from './todos.module.scss';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from '../../molecules/todo';
import { ICategory, ITodo } from '../../App';
import AddComponent from '../../molecules/addComponent/addComponent';
import useFetch from '../../hooks/useFetch';
import useSetData from '../../hooks/useData';

interface ITodos {
  category: string;
  tasks: ITodo[];
  categories: ICategory[];
  setNewTodoAdded:  React.Dispatch<React.SetStateAction<boolean>>;
}

const Todos: React.FC<ITodos> = ({
  category,
  tasks,
  categories,
  setNewTodoAdded,
}) => {
  const {
    Todos__Title,
    Todos__Header,
    Todos__Button,
    Todos__AddComponent,
    Todos__TodosList,
  } = styles;
  
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [todoData, setData] = useSetData(
    { name: '', category: 'default', completed: false },
    'category'
  );

  const { makeRequest } = useFetch();

  const addTodo = async () => {
    if (todoData.name.length >= 5) {
      const formatCategory = categories.find(
        (category) => category.categoryName === todoData.category
      );
      const currentTime = new Date();
      const createdAt = currentTime.toISOString();
      const formattedTodoData = {
        name: todoData.name,
        completed: todoData.completed,
        category: formatCategory?.categoryId ? formatCategory?.categoryId : 0,
        createdAt: createdAt,
      };

      const url = `${process.env.REACT_APP_URL}/todos`;
      const body = { formattedTodoData };
      makeRequest(url, 'POST', body).then(() => {
        setNewTodoAdded(true);
      });
      setShowAddComponent(false);
      setData('submited');
    }
  };
  const isDisabled = (): boolean => {
    if (todoData.name.length >= 5) return false;
    else return true;
  };

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
                title={'Add  Todo!'}
                inputLabel={'Todo Name'}
                inputValue={todoData.name}
                setData={setData}
                addValues={addTodo}
                dropdownOptions={categories.map(
                  (category) => category.categoryName
                )}
                dropdownPlaceholder="Choose category"
                closeAddComponent={() => setShowAddComponent(false)}
                isDisabled={isDisabled}
              />
            </div>
          )}
        </div>
      </div>
      <div className={Todos__TodosList}>
        {tasks.map((task) => (
          <Todo
            key={task.todoId}
            task={task.todoName}
            isCompleted={task.completed}
            id={task.todoId}
            category={task.categoryName}
            color={task.color}
            setNewTodoAdded={setNewTodoAdded}
            categoryId={task.categoryId}
          />
        ))}
      </div>
    </div>
  );
};
export default Todos;
