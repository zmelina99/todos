import React from 'react';
import styles from './todos.module.scss';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from '../../molecules/todo';

interface ITodos {
  category: string;
  tasks: any[];
}

const Todos: React.FC<ITodos> = ({ category, tasks }) => {
  const { Todos__Title, Todos__Header, Todos__Button } = styles;
  return (
    <div className={styles.Todos}>
      <div className={Todos__Header}>
        <div className={Todos__Title}>{category} </div>
        <div className={Todos__Button}>
          <Button
            variant="primary"
            label="Add Todo"
            icon={<AiOutlinePlus />}
          />
        </div>
      </div>
      {tasks.map((task, index) => (
        <Todo key={index} task={task.description} checked={false} />
      ))}
    </div>
  );
};
export default Todos;
