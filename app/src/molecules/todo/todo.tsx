import React, { useState } from 'react';
import { Checkbox } from '../../atoms/checkbox';
import { Category } from '../../atoms/category';
import styles from './todo.module.scss';

interface ITodo {
  task: string;
  checked: boolean;
}

const Todo: React.FC<ITodo> = ({ task, checked }) => {
  const { Todo__checked, Todo__Task } = styles;
  return (
    <div className={`${styles.Todo} ${checked && Todo__checked}`}>
      <Checkbox checked={false} />
      <span className={Todo__Task}>{task}</span>
      <Category name={''} color={''} id={0} />
    </div>
  );
};
export default Todo;
