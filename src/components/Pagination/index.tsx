import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';
import { RootState } from '../../redux/store';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);

  const pages: number = 3;
  const pagesArr: string[] = [...Array(pages).fill(1)].map((value: string, i: number) => value + i);
  pagesArr.unshift('<');
  pagesArr.push('>');

  const onChangePage = (i: number) => {
    if (i === 0) {
      if (currentPage > 1) {
        dispatch(setPage(currentPage - 1));
      }
    } else if (i === pagesArr.length - 1) {
      if (currentPage < pages) {
        dispatch(setPage(currentPage + 1));
      }
    } else {
      dispatch(setPage(i));
    }
  };

  return (
    <div className={styles.root}>
      <ul>
        {pagesArr.length > 2 &&
          pagesArr.map((value: string, i: number) => (
            <li
              onClick={() => onChangePage(i)}
              className={currentPage === i ? styles.selected : ''}
              key={uniqid()}>
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
};
