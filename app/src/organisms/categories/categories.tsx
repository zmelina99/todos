import React, { useState } from 'react';
import styles from './categories.module.scss';
import { ICategory, ISelectedCategory } from '../../App';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddComponent } from '../addComponent';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import useSetData from '../../hooks/useData';

interface ICategories {
  categories: ICategory[];
  selectedCategory: ISelectedCategory;
  setSelectedCategory: any;
  setNewCategoryAdded: any;
}

const colors = [
  '#eb5757',
  '#ababab',
  '#2f80ed',
  '#f2994a',
  '#27ae60',
  '#9b51e0',
];

const Categories: React.FC<ICategories> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setNewCategoryAdded,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  //custom hook to update data for add component
  const [categoryData, setData] = useSetData({ name: '', color: '' }, 'color');
  const { makeRequest } = useFetch();

  const addCategory = async () => {
    const url = 'http://localhost:5000/categories';
    const body = { categoryData };
    makeRequest(url, 'POST', body).then(() => {
      setNewCategoryAdded(true);
    });
  };
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
          onClick={() => setShowAddCategory(!showAddCategory)}
        />
        {showAddCategory && (
          <AddComponent
            dropdownOptions={colors}
            title="Add a new category"
            inputLabel="Category Name"
            inputValue={categoryData.name}
            setData={setData}
            addValues={addCategory}
            dropdownType="color-palette"
            dropdownPlaceholder="Choose color"
            closeAddComponent={() => setShowAddCategory(false)}
          />
        )}
      </div>
    </div>
  );
};
export default Categories;
