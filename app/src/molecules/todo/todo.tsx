import React, { useState } from 'react';
import { Checkbox } from '../../atoms/checkbox';
import { Category } from '../../atoms/category';
import styles from './todo.module.scss';
import axios from 'axios';

interface ITodo {
  task: string;
  isCompleted: boolean;
  id: number;
  category: string;
}

const Todo: React.FC<ITodo> = ({ task, id, isCompleted, category }) => {
  const [completed, setCompleted] = useState(isCompleted);

  const changeTaskState = async () => {
    setCompleted(!completed);
    console.log(!completed);
    try {
      const result = await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !completed,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { Todo__Checked, Todo__Task, Todo__Task__Checked } = styles;
  return (
    <div className={`${styles.Todo} ${completed && Todo__Checked}`}>
      <Checkbox checked={completed} onChecked={changeTaskState} id={id} />
      <span className={`${Todo__Task} ${completed && Todo__Task__Checked}`}>
        {task}
      </span>
      <Category categoryName={category} color={'blue'} categoryId={0} />
    </div>
  );
};
export default Todo;
