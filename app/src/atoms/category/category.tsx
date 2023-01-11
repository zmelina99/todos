import React from 'react';
import styles from './category.module.scss';
import { ICategory } from '../../App';

const Category: React.FC<ICategory> = ({ name, color }) => {
  const { Category__Name } = styles;

  return (
    <div className={styles.Category} style={{ backgroundColor: color }}>
      <span className={Category__Name}>{name}</span>
    </div>
  );
};
export default Category;
