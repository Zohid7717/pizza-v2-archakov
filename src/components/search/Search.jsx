import React, { useCallback, useContext, useRef, useState } from 'react';
import { LuSearch } from 'react-icons/lu'
import { IoMdClose } from 'react-icons/io'
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef()

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 1000),[]
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  return (
    <div className={styles.root}>
      <LuSearch className={styles.searchIcon} />
      <input type="text" value={value} ref={inputRef} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы...' />
      {value && <IoMdClose onClick={onClickClear} className={styles.closeIcon} /> }
    </div>
  );
}

export default Search;
