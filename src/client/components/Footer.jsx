import { Link } from 'react-router-dom'

export default function Footer() {


    return <div className='footer'>




<img className='footlogo' src="https://pbs.twimg.com/media/GJInK2jboAAHHA3?format=jpg&name=small" alt="logo"></img>
<div></div>
<div></div>
<div></div>
<Link className='footProduct' to="/">Product</Link>
<div></div>
<img className='media' src='https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9' alt=''></img>
<img className='media' src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710892800&semt=ais' alt=''></img>
<img className='media' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' alt=''></img>
<Link  className='footAccount' to="/account">Account</Link>
<h1 className='footTitle'>Coding Coffee</h1>
<div></div>
<div></div>
<div></div>
<Link  className='footAdmin' to="/admin">Admin Login</Link>
</div>








    // <nav>
    //     <Link className='navProduct' to="/">Product</Link>
    //     <Link className='navLogin' to="/login">Login</Link>
    //     <Link  className='navAccount' to="/account">Account</Link>
    //     <Link  className='navRegister' to="/register">Sign Up</Link>
    //     <Link className='navShoppingCart' to="/shoppingcart">Cart</Link>
    // </nav>
}
