import React from 'react';
// libs
import uniqid from 'uniqid';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
// components
import {Categories, Sort, PizzaBlock, Skeleton, Pagination, ErrorGetItems} from '../components';
// redux slices
import { fetchItems, selectItemsList } from '../redux/slices/itemsSlice';
import { FilterSliceType, setFilters } from '../redux/slices/filterSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearchUrl = React.useRef<boolean>(false);
  const isFirstMounted = React.useRef<boolean>(false);

  const { categoryValue, sortValue, searchValue, currentPage } = useSelector(
    (state: RootState) => state.filter,
  );
  const { itemsList, status } = useSelector(selectItemsList);

  const fetching = async () => {
    const sortValues: string[] = [
      'rating',
      'price&order=asc',
      'price&order=desc',
      'name&order=asc',
      'name&order=desc',
    ];
    const category: string = categoryValue === 0 ? '' : `&category=${categoryValue}`;
    const sort: string = `&sortBy=${sortValues[sortValue]}`;
    const search: string = searchValue ? `&search=${searchValue}` : '';
    const filters: string = sort + category + search;

    dispatch(fetchItems({ filters, currentPage }));
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    fetching();

    isSearchUrl.current = false;
  }, [categoryValue, sortValue, searchValue, currentPage, window.location.search]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as FilterSliceType;

  //     dispatch(setFilters({ ...params }));

  //     isSearchUrl.current = true;
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (isFirstMounted.current) {
  //     const queryString: string = qs.stringify({
  //       categoryValue,
  //       sortValue,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   } else {
  //     navigate('/');
  //     isFirstMounted.current = true;
  //   }
  // }, [categoryValue, sortValue, currentPage]);

  const pizzas = itemsList.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...Array(4)].map(() => <Skeleton key={uniqid()} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort value={sortValue}/>
      </div>
      <h2 className="content__title">Усі піци</h2>

      {status === 'error' ? (
        <ErrorGetItems />
      ) : (
        <div className="content__items">{status !== 'success' ? skeleton : pizzas}</div>
      )}
      {itemsList.length > 0 && <Pagination />}
    </>
  );
};

export default Home;
