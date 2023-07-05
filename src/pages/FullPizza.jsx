import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://649f176d245f077f3e9d546d.mockapi.io/items/` + id);
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пицы!!')
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <p>loading</p>
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} P</h4>
    </div>
  );
}

export default FullPizza;
