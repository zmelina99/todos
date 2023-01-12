import React from 'react';
import styles from './categories.module.scss';
import { ICategory, ISelectedCategory } from '../../App';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';

interface ICategories {
  categories: ICategory[];
  selectedCategory: ISelectedCategory;
  setSelectedCategory: any;
}

const Categories: React.FC<ICategories> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const {
    Categories__Category,
    Categories__Default,
    Categories__Category__Selected,
    Categories__Button,
  } = styles;
  console.log(selectedCategory)
  return (
    <div className={styles.Categories}>
      <div
        className={`${
          selectedCategory.id === 0 && Categories__Default
        } ${Categories__Category}`}
        onClick={() => setSelectedCategory({ name: 'default', id: 0 })}
      >
       All tasks
      </div>
      {categories.map((category) => {
        console.log(category.categoryId, 'me', selectedCategory.id);
        return (
          <div
            className={`${Categories__Category} ${
              selectedCategory.id === category.categoryId &&
              Categories__Category__Selected
            }`}
            key={category.categoryId}
            onClick={() =>
              setSelectedCategory({
                name: category.categoryName,
                id: category.categoryId,
              })
            }
          >
            {category.categoryName}
          </div>
        );
      })}
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
