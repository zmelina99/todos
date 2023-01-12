import React, { useState } from 'react';
import axios from 'axios';
import { ICategory } from '../../App';
import { Button } from '../../atoms/button';
import { DropdownSelect } from '../../molecules/dropdownSelect';
import styles from './addTodo.module.scss';
interface IAddTodo {
  categories: ICategory[];
}
export interface ITodoData {
  name: string;
  category: string;
  completed: boolean;
}
const AddTodo: React.FC<IAddTodo> = ({ categories }) => {
  const [todoData, setTodoData] = useState<ITodoData>({
    name: '',
    completed: false,
    category: 'default',
  });
  const addTodo = async () => {
    try {
      const formatCategory = categories.find(
        (category) => category.categoryName === todoData.category
      );
      const formattedTodoData = {
        name: todoData.name,
        completed: todoData.completed,
        category: formatCategory?.categoryId,
      };
      console.log(formattedTodoData);
      const result = await axios.post(`http://localhost:5000/todos`, {
        formattedTodoData,
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

  console.log(todoData, 'dt');
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
          dropdownOptions={categories.map((category) => category.categoryName)}
          onCallback={(option) =>
            setTodoData({ ...todoData, category: option })
          }
          placeholder="Select category"
        />
      </div>
      <Button label="Add" onClick={addTodo} />
    </div>
  );
};
export default AddTodo;
