import React, { useEffect, useState } from 'react';
import styles from './categories.module.scss';
import { ICategory, ISelectedCategory } from '../../App';
import { Button } from '../../atoms/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddComponent } from '../../molecules/addComponent';
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
  const {
    Categories__Category,
    Categories__Default,
    Categories__Category__Selected,
    Categories__Button,
  } = styles;

  const [showAddCategory, setShowAddCategory] = useState(false);
  //custom hook to update data for add component
  const [categoryData, setData] = useSetData({ name: '', color: '' }, 'color');
  const { makeRequest } = useFetch();

  const addCategory = async () => {
    if (categoryData.name.length >= 5) {
      const url = `${process.env.REACT_APP_URL}/categories`;
      const body = { categoryData };
      makeRequest(url, 'POST', body).then(() => {
        setNewCategoryAdded(true);
      });
      setShowAddCategory(false);
      setData('submited');
    }
  };

  const isDisabled = (): boolean => {
    if (categoryData.name.length >= 5) return false;
    else return true;
  };

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
            {category.categoryName !== 'default' && category.categoryName}
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
            title="Add category"
            inputLabel="Category Name"
            inputValue={categoryData.name}
            setData={setData}
            addValues={addCategory}
            dropdownType="color-palette"
            dropdownPlaceholder="Color"
            closeAddComponent={() => setShowAddCategory(false)}
            isDisabled={isDisabled}
          />
        )}
      </div>
    </div>
  );
};
export default Categories;
