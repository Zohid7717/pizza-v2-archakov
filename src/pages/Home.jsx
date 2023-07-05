import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/FilterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';
import Pagination from '../components/pagination/Pagination';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false)

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }))
  }
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty, categoryId, currentPage
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map(obj => (<PizzaBlock key={obj.id} {...obj} />))
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error'
            ? (<div className="cart cart--empty">
              <h2>Извените что-то пошло не так!!! <icon>😕</icon></h2>
            </div>)
            : (<div className="content__items"> {status === 'loading' ? skeletons : pizzas}</div>)
        }

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
}

export default Home;
