import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import './scss/app.scss';
import Home from './pages/Home';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart'),
  loading: () => <div>Loading</div>,
});

const PizzaDetails = React.lazy(() => import(/* webpackChunkName: "PizzaDetails" */'./pages/PizzaDetails'));
const MainLayout = React.lazy(() => import(/* webpackChunkName: "MainLayout" */'./layouts/MainLayout'));
const Error404 = React.lazy(() => import(/* webpackChunkName: "Error404" */'./pages/Error404'));


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={
          <React.Suspense fallback={<div>Завантаження піци</div>}>
            <PizzaDetails />
          </React.Suspense>} />
        <Route path="*" element={
          <React.Suspense fallback={<div>Завантаження 404</div>}>
            <Error404 />
          </React.Suspense>} />
      </Route>
    </Routes>
  );
};

export default App;
