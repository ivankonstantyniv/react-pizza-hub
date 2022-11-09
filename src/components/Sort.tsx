import React from 'react';
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux';
import { setSortValue } from '../redux/slices/filterSlice';

type BodyClick = MouseEvent & {
  path: Node[];
}

type SortProps = {
  value: number;
}

export const Sort: React.FC<SortProps> = React.memo(({value}) => {
  const dispatch = useDispatch();
  const popUpSortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const body: HTMLElement = document.body;

    const bodyClick = (event: MouseEvent) => {
      const e = event as BodyClick;

      if (popUpSortRef.current && !e.path.includes(popUpSortRef.current)) {
        setIsPopUpOpen(false);
      }
    };

    body.addEventListener('click', bodyClick);

    return () => {
      body.removeEventListener('click', bodyClick);
    };
  }, []);

  const [isPopUpOpen, setIsPopUpOpen] = React.useState<Boolean>(false);

  const sortItems: String[] = [
    'популярності',
    'вартості за зростанням',
    'вартості за спаданням',
    'алфавіту (А-Я)',
    'алфавіту (Я-А)',
  ];

  const onClickSortItem = (i: number) => {
    dispatch(setSortValue(i));
    setIsPopUpOpen(false);
  };

  return (
    <div ref={popUpSortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортування по:</b>
        <span onClick={() => setIsPopUpOpen(!isPopUpOpen)}>{sortItems[value]}</span>
      </div>
      <div className={`sort__popup sort__animated ${isPopUpOpen ? 'sort__show' : ''}`}>
        <ul>
          {sortItems.map((value, i) => (
            <li
              key={uniqid()}
              onClick={() => onClickSortItem(i)}
              className={Number(value) === i ? 'active' : ''}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
