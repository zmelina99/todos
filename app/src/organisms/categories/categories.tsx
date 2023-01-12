import React from 'react';
import styles from './categories.module.scss';
import { ICategory } from '../../App';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';

interface ICategories {
  categories: ICategory[];
  isSelected: number;
  setSelectedCategory: any;
}

const Categories: React.FC<ICategories> = ({
  categories,
  isSelected,
  setSelectedCategory,
}) => {
  const {
    Categories__Category,
    Categories__Default,
    Categories__Category__Selected,
    Categories__Button,
  } = styles;
  return (
    <div className={styles.Categories}>
      <div
        className={`${
          isSelected === 0 && Categories__Default
        } ${Categories__Category}`}
        onClick={() => setSelectedCategory(0)}
      >
        All Tasks
      </div>
      {categories.map((category, index) => (
        <div
          className={`${Categories__Category} ${
            Number(isSelected) === index + 1 && Categories__Category__Selected
          }`}
          key={category.category_id}
          onClick={() => setSelectedCategory(category.category_id)}
        >
          {category.categoryName}
        </div>
      ))}
      <div className={Categories__Button}>
        <Button
          variant="secondary"
          label="Add category"
          icon={<AiOutlinePlus />}
        />
      </div>
    </div>
  );
};
export default Categories;
