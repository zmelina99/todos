import React, { useEffect, useState } from 'react';
import styles from './todos.module.scss';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from '../../molecules/todo';
import axios from 'axios';
import { AddTodo } from '../addTodo';

interface ITodos {
  category: string;
  tasks: any[];
  categories: any[];
}

const Todos: React.FC<ITodos> = ({ category, tasks, categories }) => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const { Todos__Title, Todos__Header, Todos__Button } = styles;

  return (
    <div className={styles.Todos}>
      {showAddTodo && <AddTodo categories={categories} />}

      <div className={Todos__Header}>
        <div className={Todos__Title}>{category} </div>
        <div className={Todos__Button}>
          <Button
            variant="primary"
            label="Add Todo"
            icon={<AiOutlinePlus />}
            onClick={() => setShowAddTodo(!AddTodo)}
          />
        </div>
      </div>
      {tasks.map((task, index) => (
        <Todo
          key={index}
          task={task.name}
          isCompleted={task.completed}
          id={task.todo_id}
        />
      ))}
    </div>
  );
};
export default Todos;
