import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"; 
import { Link } from "react-router-dom";
import '../cart.css'

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
    const [productsWithDetails, setProductsWithDetails] = useState([])
    const [checkedOut, setCheckedOut] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/users/me?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("USER DATA", data.user)
                setUser(data.user);
            } catch (error) {
                setError(error);
            }
        };
    
        fetchUser();
    }, [email, token]);
    console.log('user: ', user)
    useEffect(() => {
        const fetchOrder = async () => {
          try {
            if (!user) return; // Exit if user is not defined yet
    
            const { data } = await axios.get(`/api/orders/${user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            if (data.length > 0) {
                console.log('order id: ',data[0].id)
              setOrderId(data[0].id); // Set orderId only if data is not empty
            }
          } catch (error) {
            setError(error);
          }
        };
    
        fetchOrder();
      }, [user, token]);

      useEffect(() => {
        const fetchProducts = async () => {
            try {
              if (!orderId) return; 
      
              const { data } = await axios.get(`/api/cart/${orderId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
               
                  console.log('order products: ',data)
                  setProducts(data)
            } catch (error) {
              setError(error);
            }
          };
      
          fetchProducts();
      }, [orderId, token])

      useEffect(() => {
        const fetchProductsDetails = async () => {
            try {
                if (!products.length) return; 
    
                const productIds = products.map(product => product.productId);
                console.log('product ids', productIds);
                const productDetails = await Promise.all(productIds.map(productId => axios.get(`/api/products/${productId}`)));
                console.log('productdetails', productDetails);
                // Add product quantity to the product details
                const productsWithDetails = productDetails.map((response, index) => ({
                    ...response.data,
                    quantity: products[index].quantity
                }));
                console.log('products with details ', productsWithDetails)
                setProductsWithDetails(productsWithDetails);
            } catch (error) {
                setError(error);
            }
        };
    
        fetchProductsDetails();
    }, [products]);

    useEffect(() => { 
      return () => {
        setCheckedOut(false);
      };
    }, []);

    const decreaseQuantity = async (product, index) => {
      if (product.quantity > 1) {
        const newProducts = [...productsWithDetails];
        newProducts[index].quantity--;
        setProductsWithDetails(newProducts);
        await axios.put(`/api/cart/changeQuantity`, {
          orderId: orderId,
          productId: product.id,
          quantity: newProducts[index].quantity
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      }
    };
  
    const increaseQuantity = async (product, index) => {
      const newProducts = [...productsWithDetails];
      newProducts[index].quantity++;
      setProductsWithDetails(newProducts);
      await axios.put(`/api/cart/changeQuantity`, {
        orderId: orderId,
        productId: product.id,
        quantity: newProducts[index].quantity
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    };
  
    const removeItem = async (product, index) => {
      const newProducts = productsWithDetails.filter((_, idx) => idx !== index);
      setProductsWithDetails(newProducts);
      await axios.delete(`/api/cart/deleteCartItem`, {
        data: {
            orderId: orderId,
            productId: product.id
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    };

    const  handleCheckout = async () => {
      await axios.put( `/api/orders/${orderId}/changeStatus`, {}, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  } );
    await axios.post(`api/orders/newOrder/${user.id}`, {}, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  setCheckedOut(true)
    }


    if (!user) {
        return <h1>Hey, friend you're logged out - please <NavLink to='/login'>Login</NavLink> or <NavLink to='/register'>Register</NavLink></h1>
    }

    if(products.length  === 0){
      return (
        <div className="cartEmpty"> 
        <h1>Hey, friend your cart is empty or we f*cked up -<Link to="/" > Browse coffee here!</Link></h1>  
        </div>
      )}

    if(checkedOut) {
      return (
      <div className="checkedOut"> 
      <h1>Order complete! You will never receive this coffee, but you also payed nothing for it.</h1> 
      <Link to="/" >Shop for more</Link>
      </div>
    )}

    return (
      <div>
        <h1 className="allCoffeeCoffee">Your cart:</h1>
        <div className="allCoffee">
          {productsWithDetails.map((product, index) => (
            <div key={`${product.id}-${index}`} className="cartItem">
              <Link to={`/coffee/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <h1>{product.name}</h1>
              <h2>${product.price}</h2>
              <h2>{product.roast}</h2>
              <h2>Quantity: {product.quantity}</h2>
              <button onClick={() => decreaseQuantity(product, index)}>-</button>
              <button onClick={() => increaseQuantity(product, index)}>+</button>
              <button onClick={() => removeItem(product, index)}>Remove</button> 
            </div>
          ))}
        </div>
        <button onClick={handleCheckout}>Check Out</button>
      </div>
    );
  }
 