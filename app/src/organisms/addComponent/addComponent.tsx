import React from 'react';
import { Button } from '../../atoms/button';
import { DropdownSelect } from '../../molecules/dropdownSelect';
import styles from './addComponent.module.scss';
interface IAddComponent {
  title: string;
  inputLabel: string;
  inputValue: string;
  setData: any;
  addValues(): void;
  dropdownOptions: string[];
  dropdownType?: 'color-palette' | 'default';
  dropdownPlaceholder?: string;
}
export interface ITodoData {
  name: string;
  category: string;
  completed: boolean;
}
const AddComponent: React.FC<IAddComponent> = ({
  title,
  inputLabel,
  inputValue,
  setData,
  dropdownOptions,
  dropdownType = 'default',
  addValues,
  dropdownPlaceholder,
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
          dropdownOptions={dropdownOptions}
          onCallback={(option) => setData(option)}
          placeholder={dropdownPlaceholder}
          type={dropdownType}
        />
      </div>
      <Button label="Add" onClick={addValues} />
    </div>
  );
};
export default AddComponent;
