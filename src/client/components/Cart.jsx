import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom";

//useState ternary combo to only display cart if logged in?(in navbar?)

//1. get orderId from userId/email/token? ex. const orderId = await getOrder()

//2. get products with that order id from order_product table

//3. display info on cart products

//4. ability to edit quantity and remove products from cart (needs token?)

import React from 'react';

// Define a ShoppingCart component
function ShoppingCart() {
  // Initialize the state of the cart with an empty array
  const [cart, setCart] = React.useState([]);

  // Add an item to the cart
  function addToCart(item) {
    setCart([...cart, item]);
  }

  // Remove an item from the cart
  function removeFromCart(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  // Calculate the total price of the items in the cart
  function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price, 0);
  }

  return (
    <div>
      {/* Display the current items in the cart */}
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Display the total price of the items in the cart */}
      <p>Total: ${getTotalPrice()}</p>

      {/* Add a button to add an item to the cart */}
      <button onClick={() => addToCart({ name: 'Item 1', price: 10 })}>
        Add Item 1
      </button>
    </div>
  );
}

export default ShoppingCart;
