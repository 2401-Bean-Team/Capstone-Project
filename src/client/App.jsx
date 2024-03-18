import { useState } from 'react'; 
import Login from './components/Login';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { Route, Routes} from 'react-router-dom'

function App() {
    

  return (
    <Routes>
    <div className='App'> 
       
      <Route path='/' element={<AllProducts />} /> 
      <Route path='/products/:productId' element={<SingleProduct />} /> 
    </div>
    </Routes>
  );
}

export default App;
