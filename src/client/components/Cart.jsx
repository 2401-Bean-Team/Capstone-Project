import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"; 

//useState ternary combo to only display cart if logged in?(in navbar?)

//1. get orderId from userId/email/token? ex. const orderId = await getOrder()

//2. get products with that order id from order_product table

//3. display info on cart products

//4. ability to edit quantity and remove products from cart (needs token?)

export default function ShoppingCart({ token, email }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => { 
        const fetchUser = async () => {
          try {
            const { data } = await axios.get(`/api/users/me?email=${email}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("USERDATA", data.user);
            setUser(data.user)
            
          } catch (error) {
            setError(error);
          }
        }  
    
      // Call the fetchUser function when the component mounts
      fetchUser();
    
    }, [email, token]);

    if (!user) {
        return <h1>Logged out, please <NavLink to='/login'>Login</NavLink> or <NavLink to='/register'>Register</NavLink></h1>
    }

    return ( 
        <>
              
            <main className="account" >
                <h1>Account details: </h1>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4> 
                 
            </main>
        </> 
    )

}






// import React from 'react';


// // Define a ShoppingCart component
// function ShoppingCart({ token }) {
//   // Initialize the state of the cart with an empty array
//   const [cart, setCart] = React.useState([]);

//   console.log('token: ', token)
//   // Add an item to the cart
//   function addToCart(item) {
//     setCart([...cart, item]);
//   }

//   // Remove an item from the cart
//   function removeFromCart(index) {
//     const newCart = [...cart];
//     newCart.splice(index, 1);
//     setCart(newCart);
//   }

//   // Calculate the total price of the items in the cart
//   function getTotalPrice() {
//     return cart.reduce((total, item) => total + item.price, 0);
//   }

//   return (
//     <div>
//       {/* Display the current items in the cart */}
//       <h2>Shopping Cart</h2>
//       <ul>
//         {cart.map((item, index) => (
//           <li key={index}>
//             {item.name} - ${item.price}
//             <button onClick={() => removeFromCart(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
    
//       {/* Display the total price of the items in the cart */}
//       <p>Total: ${getTotalPrice()}</p>

//       {/* Add a button to add an item to the cart */}
//       <button onClick={() => addToCart({ name: 'Item 1', price: 10 })}>
//         Add Item 1
//       </button>
//     </div>
//   );
// }

//export default ShoppingCart;
