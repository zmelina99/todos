import React from 'react';
import { ICategory } from '../../App';

import styles from './category.module.scss';

const Category: React.FC<ICategory> = ({ categoryName, color }) => {
  const { Category__Name } = styles;
  return (
    <div className={styles.Category} style={{ backgroundColor: color }}>
      <span className={Category__Name}>{categoryName}</span>
    </div>
  );
};
export default Category;
