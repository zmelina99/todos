import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'secondary';

  color?: 'solid' | 'gradient';

  disabled?: boolean;

  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button: React.FC<ButtonProps> = ({ variant, label }) => {
  return (
    <button className={`${styles.Button} ${styles[`Button--${variant}`]} `}>
      {label}
    </button>
  );
};

export default Button;
