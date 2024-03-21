import { useState } from 'react';
import Login from './components/Login';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Account from './components/Account';
import Register from './components/Register';
import { Route, Routes, NavLink } from 'react-router-dom'
import NavBar from './components/NavBar';
import ShoppingCart from './components/Cart';


function App() {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  return (
< div className = 'App'>
<header>
        <h1>Coding Coffee</h1>
        <NavBar className="navagation" />
      </header>
    <Routes>

      <Route path='/' element={<AllProducts />} />
      <Route path='/coffee/:productId' element={<SingleProduct />} />
      <Route path='/login' element={<Login setToken={setToken} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
      <Route path='/account' element={<Account token={token} setToken={setToken} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
      <Route path='/register' element={<Register setToken={setToken} />} />
      <Route path='/cart' element={<ShoppingCart token={token} email={email} />} />
    </Routes>
</div>
  );
}

export default App;
