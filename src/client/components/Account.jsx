import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"; 



export default function Account({ token, setToken, email, password }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null) 
    
    useEffect(() => {
        async function fetchData() {
            try { 
                const userData = await getUser();
                setUser(userData); 
            } catch (error) {
                setError(error); 
            }
        }

        fetchData();
    }, [email, password]);

    async function getUser(userId) {
        const { data } = await axios.get('/api/users/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    }
 
    function logOut() {
        setToken(null) 
        navigate('/')
    } 

    async function returnOrder(orderId, token) {
        try {
          // Make a request to return the order
          await axios.post(
            `/api/orders/return/${orderId}`,
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          // Refetch user data after successful order return
          const userData = await getUser(email, password);
          setUser(userData);
        } catch (error) {
          console.error("Error returning order:", error);
        }
      }

    if (!user) {
        return <h1>Logged out, please <NavLink to='/login'>Login</NavLink> or <NavLink to='/register'>Register</NavLink></h1>
    }
    return ( 
        <>
              
            <main className="account" >
                <h1>Account details</h1>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <button onClick={logOut} >Log Out</button>
                <h2>Your Orders: </h2>
                <section className="orders-account-list"> 
                {!user.orders || user.orders.length === 0 ? (
                    <h4>No items in order</h4>
                ) : (  
                    user.orders.map(order => (  
                        <article key={order.id} className="order-item-card">
                            <h4>{order.name}</h4>
                            <h5>{order.price}</h5>
                            <h5>{order.roast}</h5>
                            <img src={order.image} alt={order.name} /> 
                            <p>{order.description}</p> 
                        </article>   
                    )) 
                )}
                </section>
            </main>
        </> 
    )  

}