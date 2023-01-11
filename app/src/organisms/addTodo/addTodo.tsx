import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '../../atoms/button';
import { DropdownSelect } from '../../molecules/dropdownSelect';
import styles from './addTodo.module.scss';
interface IAddTodo {
  categories: any[];
}
export interface ITodoData {
  name: string;
  category: number;
  completed: boolean;
}
const AddTodo: React.FC<IAddTodo> = ({ categories }) => {
  const [todoName, setTodoName] = useState('');
  const [todoData, setTodoData] = useState<ITodoData>({
    name: '',
    completed: false,
    category: 1,
  });

  const addTodo = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/todos`, {
        todoData,
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    AddTodo__Input,
    AddTodo__Header,
    AddTodo__Categories,
    AddTodo__Name,
    AddTodo__Name__Label,
  } = styles;

  return (
    <div className={styles.AddTodo}>
      <div className={AddTodo__Header}>Add New ToDo!</div>

      <div className={AddTodo__Name}>
        <span className={AddTodo__Name__Label}>Todo title: </span>
        <input
          className={AddTodo__Input}
          value={todoData.name}
          onChange={(event) =>
            setTodoData({ ...todoData, name: event?.target.value })
          }
        />
      </div>

      <div className={AddTodo__Categories}>
        <DropdownSelect
          dropdownOptions={categories.map((category) => category.name)}
        />
      </div>
      <Button label="Add" onClick={addTodo} />
    </div>
  );
};
export default AddTodo;
