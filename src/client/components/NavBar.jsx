import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
 

//need to add usestate and ternary to determine if logged in
//before displaying account/cart... if so do not display login/register

export default function NavBar({ token }) {
  const navigate = useNavigate()

    return <div className='NAVBAR'>
    <nav role="navigation">
  <div id="menuToggle">
    <input type="checkbox" />


    <span></span>
    <span></span>
    <span></span>


    <ul id="menu">

      <Link className='navProduct' to="/"><li>Product</li></Link>
      {token ? (
<>
      </>)
: (
<> <Link className='navLogin' to="/login"><li>Login</li></Link>
      <Link  className='navRegister' to="/register"><li>Sign Up</li></Link></>
      )}

      <Link  className='navAccount' to="/account"><li>Account</li></Link>
      <Link  className='navCart' to="/cart"><li>Cart</li></Link>
    </ul>
  </div>
</nav>
<img className='logo' src="https://pbs.twimg.com/media/GJInK2jboAAHHA3?format=jpg&name=small" alt="logo" onClick={()=> navigate("/")}></img>
<Link className='shoppingCartIcon' to="/cart"><i className="fa fa-shopping-cart"></i></Link>


</div>








    // <nav>
    //     <Link className='navProduct' to="/">Product</Link>
    //     <Link className='navLogin' to="/login">Login</Link>
    //     <Link  className='navAccount' to="/account">Account</Link>
    //     <Link  className='navRegister' to="/register">Sign Up</Link>
    //     <Link className='navShoppingCart' to="/shoppingcart">Cart</Link>
    // </nav>
}
