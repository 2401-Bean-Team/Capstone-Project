import { Link } from 'react-router-dom'

export default function NavBar() {


    return <div className='NAVBAR'>
    <nav role="navigation">
  <div id="menuToggle">
    <input type="checkbox" />


    <span></span>
    <span></span>
    <span></span>


    <ul id="menu">

      <Link className='navProduct' to="/"><li>Product</li></Link>
      <Link className='navLogin' to="/login"><li>Login</li></Link>
      <Link  className='navAccount' to="/account"><li>Account</li></Link>
      <Link  className='navRegister' to="/register"><li>Sign Up</li></Link>
    </ul>
  </div>
</nav>
<img className='logo' src="https://pbs.twimg.com/media/GJInK2jboAAHHA3?format=jpg&name=small" alt="logo"></img>
<h1 className='cartimg'>cart</h1>
</div>








    // <nav>
    //     <Link className='navProduct' to="/">Product</Link>
    //     <Link className='navLogin' to="/login">Login</Link>
    //     <Link  className='navAccount' to="/account">Account</Link>
    //     <Link  className='navRegister' to="/register">Sign Up</Link>
    //     <Link className='navShoppingCart' to="/shoppingcart">Cart</Link>
    // </nav>
}
