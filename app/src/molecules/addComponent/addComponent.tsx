import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '../../atoms/button';
import { DropdownSelect } from '../dropdownSelect';
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
  closeAddComponent(): void;
  isDisabled(): boolean;
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
  closeAddComponent,
  isDisabled,
}) => {
  const {
    AddComponent__Input,
    AddComponent__Header,
    AddComponent__Header__Title,
    AddComponent__Header__Icon,
    AddComponent__Categories,
    AddComponent__Name,
    AddComponent__Name__Label,
  } = styles;
console.log(isDisabled())
  return (
    <div className={styles.AddComponent}>
      <div className={AddComponent__Header}>
        <span className={AddComponent__Header__Title}>{title}</span>
        <button
          className={AddComponent__Header__Icon}
          onClick={closeAddComponent}
        >
          <AiOutlineClose size="20px" />
        </button>
      </div>

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
      <Button label="Add" onClick={addValues} disabled={isDisabled()} />
    </div>
  );
};
export default AddComponent;
