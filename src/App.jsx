import React from 'react';
import { Routes, Route, Switch, RouterProvider, Router } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <switch>
        <Route path="/"exact Component={Home}/>
        <Route path="/products"exact Component={ProductList}/>
        <Route path="/products/:id"exact Component={ProductDetail}/>
      </switch>
    </Router>
  )
}

export default App;