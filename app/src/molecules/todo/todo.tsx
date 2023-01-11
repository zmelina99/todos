import React from 'react';
import { Checkbox } from '../../atoms/checkbox';
import { Category } from '../../atoms/category';
import styles from './todo.module.scss';

interface ITodo {
  task: string;
  checked: boolean;
}

const Todo: React.FC<ITodo> = ({ task, checked }) => {
  const { Todo__Checked, Todo__Task, Todo__Task__Checked } = styles;
  return (
    <div className={`${styles.Todo} ${checked && Todo__Checked}`}>
      <Checkbox checked={checked} />
      <span className={`${Todo__Task} ${checked && Todo__Task__Checked}`}>
        {task}
      </span>
      <Category name={'Banana'} color={'blue'} id={0} />
    </div>
  );
};
export default Todo;
