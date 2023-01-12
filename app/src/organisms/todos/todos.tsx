import React, { useState } from 'react';
import styles from './todos.module.scss';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from '../../molecules/todo';
import { AddTodo } from '../addTodo';
import { ICategory, ITodo } from '../../App';

interface ITodos {
  category: string;
  tasks: ITodo[];
  categories: ICategory[];
}

const Todos: React.FC<ITodos> = ({ category, tasks, categories }) => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const { Todos__Title, Todos__Header, Todos__Button, Todos__AddTodo } = styles;
  return (
    <div className={styles.Todos}>
      <div className={Todos__Header}>
        <div className={Todos__Title}>{category} </div>
        <div className={Todos__Button}>
          <Button
            variant="primary"
            label="Add Todo"
            icon={<AiOutlinePlus />}
            onClick={() => setShowAddTodo(!showAddTodo)}
          />
          {showAddTodo && (
            <div className={Todos__AddTodo}>
              <AddTodo categories={categories} />
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
        />
      ))}
    </div>
  );
};
export default Todos;
