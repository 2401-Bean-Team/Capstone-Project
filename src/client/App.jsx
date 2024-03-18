import { useState } from 'react';
import Login from './components/Login';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { Route, Routes, NavLink } from 'react-router-dom'

function App() {


  return (
< div className = 'App'>
<header>
        <h1>Coding Coffee</h1>
        <nav>
          <NavLink to='/'>Products</NavLink>

        </nav>
      </header>
    <Routes>

      <Route path='/' element={<AllProducts />} />
      <Route path='/:productId' element={<SingleProduct />} />

    </Routes>
</div>
  );
}

export default App;
