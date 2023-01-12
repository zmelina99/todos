import React, { useState } from 'react';
import axios from 'axios';
import { ICategory } from '../../App';
import { Button } from '../../atoms/button';
import { DropdownSelect } from '../../molecules/dropdownSelect';
import styles from './addComponent.module.scss';
interface IAddComponent {
  categories: ICategory[];
  title: string;
  inputLabel: string;
  inputValue: string;
  setData: any;
  addValues(): void;
}
export interface ITodoData {
  name: string;
  category: string;
  completed: boolean;
}
const AddComponent: React.FC<IAddComponent> = ({
  categories,
  title,
  inputLabel,
  inputValue,
  setData,
  addValues,
}) => {
  const {
    AddComponent__Input,
    AddComponent__Header,
    AddComponent__Categories,
    AddComponent__Name,
    AddComponent__Name__Label,
  } = styles;

  return (
    <div className={styles.AddComponent}>
      <div className={AddComponent__Header}>{title}</div>

      <div className={AddComponent__Name}>
        <span className={AddComponent__Name__Label}> {inputLabel}</span>
        <input
          className={AddComponent__Input}
          value={inputValue}
          onChange={(event) => setData(event)}
        />
      </div>

      <div className={AddComponent__Categories}>
        <DropdownSelect
          dropdownOptions={categories.map((category) => category.categoryName)}
          onCallback={(option) => setData(option)}
          placeholder="Select category"
        />
      </div>
      <Button label="Add" onClick={addValues} />
    </div>
  );
};
export default AddComponent;
