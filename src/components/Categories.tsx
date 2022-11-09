import React from 'react';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryValue } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

export const Categories: React.FC = React.memo(() => {
  const categoryValue = useSelector((state: RootState) => state.filter.categoryValue);
  const dispatch = useDispatch();

  const categories: String[] = ['Усі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            onClick={() => dispatch(setCategoryValue(i))}
            className={categoryValue === i ? 'active' : ''}
            key={uniqid()}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

