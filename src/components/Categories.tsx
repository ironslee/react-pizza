// Categories
import React from "react";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  // function Categories({value, onChangeCategory}) {
    useWhyDidYouUpdate('Categories', { value, onChangeCategory });
    
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые'
    ];
  
    // const onCLickCategory = (index) => {
    //   setActiveIndex(index);
    // }
  
    return (
      <div className="categories">
        <ul>
          {
            categories.map((categoryName, index) => 
              <li 
              key={index} 
              onClick={() => onChangeCategory(index)} 
              className={value === index ? "active" : ''}>
                {categoryName}
              </li>)
          }
          
        </ul>
      </div>
    )
  })

export default Categories;