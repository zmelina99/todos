import React, { InputHTMLAttributes } from 'react';
import styles from './checkbox.module.scss';
import { AiOutlineCheck } from 'react-icons/ai';
type ICheckbox = {
  checked: boolean;
  onChecked(): void;
  id: any;
} 

const Checkbox: React.FC<ICheckbox> = ({ checked, onChecked, id }) => {
  const { Checkbox__CheckedIcon } = styles;
  return (
    <div className={styles.Checkbox} onClick={() =>onChecked()}>
      {checked && (
        <span className={Checkbox__CheckedIcon}>
          {<AiOutlineCheck color="#27AE60" size="1.5rem" />}
        </span>
      )}
    </div>
  );
};
export default Checkbox;
