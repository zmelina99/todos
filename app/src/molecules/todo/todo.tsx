import React, { useState } from 'react';
import { Checkbox } from '../../atoms/checkbox';
import { Category } from '../../atoms/category';
import styles from './todo.module.scss';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

interface ITodo {
  task: string;
  isCompleted: boolean;
  id: number;
  category: string;
  color?: string;
}

const Todo: React.FC<ITodo> = ({ task, id, isCompleted, category, color }) => {
  const [completed, setCompleted] = useState(isCompleted);
  const { makeRequest } = useFetch();

  const changeTaskState = async () => {
    setCompleted(!completed);
    const url = `http://localhost:5000/todos/${id}`;
    const body = { completed: !completed };
    makeRequest(url, 'PUT', body);
  };

  const { Todo__Checked, Todo__Task, Todo__Task__Checked } = styles;
  return (
    <div className={`${styles.Todo} ${completed && Todo__Checked}`}>
      <Checkbox checked={completed} onChecked={changeTaskState} />
      <span className={`${Todo__Task} ${completed && Todo__Task__Checked}`}>
        {task}
      </span>
      <Category
        categoryName={category}
        color={color ? color : 'transparent'}
        categoryId={0} //FIXME
      />
    </div>
  );
};
export default Todo;
