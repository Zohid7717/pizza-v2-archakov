import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/FilterSlice'
import Pagination from '../components/pagination/Pagination';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import { SearchContext } from '../App';


const Home = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      console.log(params)
      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
    }
  }, []);

  useEffect(() => {
    setIsLoading(true)

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    axios.get(`https://649f176d245f077f3e9d546d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,)
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      });
    
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType, categoryId, currentPage
    });
    navigate(`?${queryString}`)
  }, [categoryId, sortType, currentPage]);

  const pizzas = items.map(obj => (<PizzaBlock key={obj.id} {...obj} />))
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            isLoading ? skeletons : pizzas
          }
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
}

export default Home;
