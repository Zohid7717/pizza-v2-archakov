import React, { FC, useCallback, useContext, useRef, useState } from 'react';
import { LuSearch } from 'react-icons/lu'
import { IoMdClose } from 'react-icons/io'
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/FilterSlice';

const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null)

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000), []
  )

  const onChangeInput = (event:any) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <div className={styles.root}>
      <LuSearch className={styles.searchIcon} />
      <input type="text" value={value} ref={inputRef} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы...' />
      {value && <IoMdClose onClick={onClickClear} className={styles.closeIcon} />}
    </div>
  );
}

export default Search;
