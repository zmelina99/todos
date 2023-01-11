import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'secondary';

  icon?: ReactNode;
  color?: 'solid' | 'gradient';

  disabled?: boolean;

  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button: React.FC<ButtonProps> = ({ variant, label, icon }) => {
  const { Button__Icon, Button__Label } = styles;
  return (
    <button className={`${styles.Button} ${styles[`Button--${variant}`]} `}>
      {icon && <span className={Button__Icon}> {icon}</span>}
      <span className={Button__Label}> {label}</span>
    </button>
  );
};

export default Button;