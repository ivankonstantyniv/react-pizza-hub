import React from 'react';
import debounce from 'lodash.debounce';

import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';
import searchSVG from '../../assets/img/search-svgrepo-com.svg';
import clearSVG from '../../assets/img/close_delete_icon.svg';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [tempValue, setTempValue] = React.useState<string>('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((val: string) => {
      dispatch(setSearchValue(val));
    }, 300),
    [],
  );

  const onClickClear = () => {
    setTempValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(event.target.value);
    updateSearchValue(tempValue);
  };

  return (
    <div className={styles.root}>
      <img className={styles.searchSvg} alt="search" src={searchSVG} />
      <input ref={inputRef} value={tempValue} onChange={onChangeValue} placeholder="Пошук" />
      {tempValue.length > 0 && (
        <img onClick={onClickClear} className={styles.clearSvg} alt="clear" src={clearSVG} />
      )}
    </div>
  );
};
