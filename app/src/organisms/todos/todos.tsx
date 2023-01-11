import React, { useEffect, useState } from 'react';
import styles from './todos.module.scss';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from '../../molecules/todo';
import axios from 'axios';
import { AddTodo } from '../addTodo';
interface ICategory {
  category_id: number;
  color: string;
  name: string;
}
interface ITodos {
  category: string;
  tasks: any[];
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
      {tasks.map((task, index) => {
        const categoryString = categories.find(
          (el) => el.category_id === task.category_id
        )?.name;
        return (
          <Todo
            key={index}
            task={task.todo_name}
            isCompleted={task.completed}
            id={task.todo_id}
            category={categoryString}
          />
        );
      })}
    </div>
  );
};
export default Todos;
