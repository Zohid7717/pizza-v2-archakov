import React, { Suspense } from 'react'; //suspense для линивой загрузки сайта - она не работает на серверной старане
import Home from './pages/Home';
// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullP

import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'))
const FullPizza = React.lazy(() => import('./pages/FullPizza'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='cart' element={
            <Cart />
          } />
          <Route path='pizza/:id' element={
            <Suspense fallback={<p>Идет загрузка пицы...</p>}>
              <FullPizza />
            </Suspense>
          } />
          <Route path='*' element={
            <Suspense fallback={<p>Помоему пица не нашлось...</p>}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
